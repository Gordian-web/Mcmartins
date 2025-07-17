import React from "react";
import { useCart } from "../cart/cartcontext";
import { useNavigate } from "react-router-dom";
import shop from '../assets/shopping-basket (1).png';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const [isVisible, setIsVisible] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const calculateShipping = () => {
    if (totalItems === 0) return 0;
    if (totalItems <= 5) return 15.99;
    if (totalItems <= 10) return 5.99;
    return 12.99;
  };

  const calculateTax = () => {
    return totalPrice * 0.1;
  };

  const calculateTotal = () => {
    return totalPrice + calculateShipping() + calculateTax();
  };

  const handleCheckout = () => {
    if (totalItems === 0) {
      alert("Your cart is empty. Please add items before proceeding to checkout.");
      return;
    }
    
    navigate('/checkout', {
      state: {
        cartItems: cart,
        subtotal: totalPrice,
        shipping: calculateShipping(),
        tax: calculateTax(),
        total: calculateTotal(),
        itemCount: totalItems
      }
    });
  };

  return (
    <div className={'fixed inset-0 bg-white bg-opacity-50 z-50 flex   '}>
      <div className={`bg-white w-full h-full flex flex-col  transition-transform duration-1000 ease-out ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 transition-transform duration-1000 ease-out"}`}>
        {/* Header Section */}
        <div className={'p-6 border-b sticky top-0 bg-white z-10  '}>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Your Cart ({totalItems.toLocaleString()} {totalItems > 200 ? "🎉" : ""})
            </h2>
            {cart.length > 0 && (
              <button 
                onClick={clearCart}
                className="text-white bg-black py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors duration-300"
              >
                Clear All
              </button>
            )}
          </div>
          {totalItems > 200 && (
            <p className="text-green-600 font-medium mt-2">
              Wow! You've got {totalItems.toLocaleString()} items in your cart! 🎊
            </p>
          )}
        </div>

        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow">
            <div className="text-center">
              <img
                src={shop}
                alt="Empty Cart"
                className="w-24 h-24 mx-auto mb-4 grayscale opacity-40"
              />
              <p className="text-gray-500 font-bold text-xl mb-3">Your cart is empty.</p>
              <p className="text-gray-500 mb-7">Add items to your cart to see them here.</p>
              <a
                className="inline-block px-6 py-3 mb-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300"
                href="/"
              >
                Start Shopping
              </a>
            </div>
          </div>
        ) : (
          <>
            {/* Items List - Scrollable Area */}
            <div className="flex-grow overflow-y-auto px-6">
              <div className="space-y-4 py-4">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.quantity}`} className="flex border-b pb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                      loading="lazy"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="mx-3 w-8 text-center">
                          {item.quantity.toLocaleString()}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-black hover:text-red-500 font-semibold transition-colors duration-300"
                      >
                        Remove
                      </button>
                      <p className="font-medium">
                        ${(item.price * item.quantity).toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checkout Section - Sticky Footer */}
            <div className="border-t pt-4 px-6 pb-6 bg-white sticky bottom-0">
              {/* Order Summary Breakdown */}
              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({totalItems} items):</span>
                  <span>${totalPrice.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span>${calculateShipping().toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span>${calculateTax().toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${calculateTotal().toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}</span>
                  </div>
                </div>
              </div>
              {/* Checkout Button (Fixed) */}
              <button
                className="w-full block text-center px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 z-50"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;