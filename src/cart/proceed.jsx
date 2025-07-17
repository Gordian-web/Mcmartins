import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../cart/cartcontext';

export default function CheckoutForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  
  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_PUBLIC_ID);
  }, []);

  // Get cart data from navigation state
  const { cartItems = [], subtotal = 0, tax = 0, itemCount = 0 } = location.state || {};

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    saveInfo: false,
    shippingMethod: 'standard',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber] = useState(Math.floor(Math.random() * 1000000));
  const [formErrors, setFormErrors] = useState({});
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  
  const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', price: 5.99, days: '3-5 business days' },
    { id: 'express', name: 'Express Shipping', price: 12.99, days: '2-3 business days' },
    { id: 'priority', name: 'Priority Shipping', price: 19.99, days: '1-2 business days' },
  ];

  const shipping = shippingOptions.find(opt => opt.id === formData.shippingMethod)?.price || 0;

  // Redirect if no cart data
  useEffect(() => {
    if (!location.state || cartItems.length === 0) {
      navigate('/cart');
    }
  }, [location.state, cartItems.length, navigate]);

  // Load saved form data
  useEffect(() => {
    const savedFormData = localStorage.getItem('checkoutFormData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.city.trim()) errors.city = 'City is required';
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.zipCode.trim()) errors.zipCode = 'ZIP code is required';
    
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber.trim() || formData.cardNumber.replace(/\s/g, '').length !== 16) {
        errors.cardNumber = 'Valid card number is required';
      }
      if (!formData.cardExpiry.trim() || !/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        errors.cardExpiry = 'Valid expiry date (MM/YY) required';
      }
      if (!formData.cardCvc.trim() || formData.cardCvc.length !== 3) {
        errors.cardCvc = 'Valid CVC required';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const sendOrderConfirmation = async (orderData) => {
    try {
      const templateParams = {
        to_email: orderData.customer.email,
        customer_name: orderData.customer.name,
        order_number: orderData.orderNumber,
        order_date: new Date().toLocaleDateString(),
        order_items: orderData.items.map(item => 
          `${item.name} (Qty: ${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`
        ).join('\n'),
        subtotal: `$${orderData.subtotal.toFixed(2)}`,
        shipping: `$${orderData.shipping.toFixed(2)}`,
        tax: `$${orderData.tax.toFixed(2)}`,
        total: `$${orderData.total.toFixed(2)}`,
        shipping_address: orderData.customer.address,
        payment_method: orderData.paymentMethod
      };

      await emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_ORDER_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_PUBLIC_ID
      );

      return true;
    } catch (error) {
      console.error('Email send error:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    try {
      // Save form data if requested
      if (formData.saveInfo) {
        localStorage.setItem('checkoutFormData', JSON.stringify(formData));
      }

      // Prepare order data
      const orderDetails = {
        orderNumber,
        customer: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city}, ${formData.country} ${formData.zipCode}`
        },
        items: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        subtotal,
        shipping,
        tax,
        total: subtotal + shipping + tax - discount,
        paymentMethod: formData.paymentMethod === 'credit-card' ? 'Credit Card' : 'PayPal'
      };

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Send confirmation email
      const emailSent = await sendOrderConfirmation(orderDetails);
      
      if (emailSent) {
        clearCart();
        setOrderSuccess(true);
      } else {
        alert("Order processed but email failed to send. Please check your email for confirmation.");
      }
    } catch (error) {
      console.error('Order processing error:', error);
      alert("There was an error processing your order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const calculateTotal = () => {
    return subtotal + shipping + tax - discount;
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setDiscount(subtotal * 0.1);
      return true;
    } else if (couponCode.toUpperCase() === 'FREESHIP') {
      setDiscount(15.00);
      return true;
    }
    setDiscount(0);
    return false;
  };

  if (orderSuccess) {
    return (
      <div className="max-w-2xl mx-auto p-6  bg-white rounded-lg shadow-md">
        <div className="text-center py-12">
          <div className="mx-auto flex items-center   mt-10 justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-3 text-2xl font-bold text-gray-900">Thank You For Your Order!</h2>
          <p className="mt-2 text-gray-600">Your order #{orderNumber} has been placed successfully.</p>
          <p className="mt-2 text-gray-600">A confirmation email has been sent to {formData.email}.</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 ">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className={'flex items-center mt-30 justify-between mb-8 transition-transform duration-1000 ease-out bg-gray-50 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}'}>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <button
            type="button"
            className="text-sm font-medium text-white bg-black px-3 py-3 rounded-md"
            onClick={() => navigate('/cart')}
          >
            Back to cart
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit}>
            {/* Contact Information */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Contact information</h2>
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {formErrors.firstName && <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {formErrors.lastName && <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {formErrors.email && <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {formErrors.phone && <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping address</h2>
              <div className="grid grid-cols-1 gap-y-4">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Street address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {formErrors.address && <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>}
                </div>

                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${formErrors.city ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                    {formErrors.city && <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>}
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      value={formData.country}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${formErrors.country ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    >
                      <option value="">Select</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="UK">Nigeria</option>
                      <option value="UK">philipenes</option>

                    </select>
                    {formErrors.country && <p className="mt-1 text-sm text-red-600">{formErrors.country}</p>}
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                      ZIP / Postal code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                      className={`mt-1 block w-full border ${formErrors.zipCode ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                    />
                    {formErrors.zipCode && <p className="mt-1 text-sm text-red-600">{formErrors.zipCode}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping method</h2>
              <div className="space-y-4">
                {shippingOptions.map((option) => (
                  <div key={option.id} className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id={option.id}
                        name="shippingMethod"
                        type="radio"
                        checked={formData.shippingMethod === option.id}
                        onChange={() => setFormData(prev => ({ ...prev, shippingMethod: option.id }))}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor={option.id} className="font-medium text-gray-700">
                        {option.name} - ${option.price.toFixed(2)}
                      </label>
                      <p className="text-gray-500">{option.days}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Payment method</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="credit-card"
                    name="paymentMethod"
                    type="radio"
                    value="credit-card"
                    checked={formData.paymentMethod === 'credit-card'}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                    Credit card
                  </label>
                </div>

                {formData.paymentMethod === 'credit-card' && (
                  <div className="mt-4 grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-4">
                    <div className="sm:col-span-3">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                        Card number
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="0000 0000 0000 0000"
                        className={`mt-1 block w-full border ${formErrors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                      {formErrors.cardNumber && <p className="mt-1 text-sm text-red-600">{formErrors.cardNumber}</p>}
                    </div>

                    <div>
                      <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
                        Expiration date (MM/YY)
                      </label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className={`mt-1 block w-full border ${formErrors.cardExpiry ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                      {formErrors.cardExpiry && <p className="mt-1 text-sm text-red-600">{formErrors.cardExpiry}</p>}
                    </div>

                    <div>
                      <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cardCvc"
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleChange}
                        placeholder="CVC"
                        className={`mt-1 block w-full border ${formErrors.cardCvc ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                      {formErrors.cardCvc && <p className="mt-1 text-sm text-red-600">{formErrors.cardCvc}</p>}
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <input
                    id="paypal"
                    name="paymentMethod"
                    type="radio"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleChange}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                    PayPal
                  </label>
                </div>
              </div>
            </div>

            {/* Coupon code */}
            <div className="mb-8">
              <label htmlFor="coupon" className="sr-only">Coupon code</label>
              <div className="flex">
                <input
                  type="text"
                  id="coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code"
                  className="block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  Apply
                </button>
              </div>
              {discount > 0 && (
                <p className="mt-2 text-sm text-green-600">
                  Coupon applied! ${discount.toFixed(2)} discount
                </p>
              )}
            </div>

            {/* Order Summary */}
            <div className="mb-6 border-t border-gray-200 pt-4">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Order summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({itemCount} items):</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span>$15.99</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount:</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Submit button */}
            <button
              type="submit"
              disabled={isProcessing || cartItems.length === 0}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${isProcessing || cartItems.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                `Pay $${calculateTotal().toFixed(2)}`
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}