import React, { useState, useEffect } from 'react';
import faqImage from '../assets/faq.png'; // Your image import

const faqs = [
    {
        question: " 1. What is your return and exchange policy?",
        answer: "At McMartins Fashion Ltd, we offer a 30-day return and exchange policy from the date of purchase. Items must be unworn, unwashed, and in their original packaging with tags attached. Simply contact our customer service team to initiate a return or exchange. Refunds will be processed to the original payment method, while store credit or exchanges can be arranged for eligible items."
    },
        {
        question: "2. How can I track my order?",
        answer: "Once your order ships, you will receive an email with tracking information. You can also log into your account on our website to view your order status and tracking details."
    },
    {
        question: " 3. Do you offer international shipping?",
        answer: "Yes! McMartins Fashion Ltd ships to multiple countries worldwide. Shipping costs and delivery times vary depending on your location. You can view available destinations and estimated delivery times at checkout. Please note that customs duties or import taxes may apply, depending on your country’s regulations."
    },
    {        question: "4. What payment methods do you accept?",
        answer: "We accept various payment methods, including major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All transactions are processed securely to ensure your information is protected."
    },
    {
        question: "5. How do I care for my shoes?",
        answer: "To keep your shoes in top condition, we recommend following the care instructions provided with each pair. Generally, you should clean them regularly with a damp cloth, avoid exposing them to extreme temperatures or moisture, and store them in a cool, dry place when not in use."    
    }

];

function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const toggle = idx => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className={`min-h-screen bg-[#3e3e3e] transition-transform duration-1000 ease-out ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
            <div className="container mx-auto  px-4 py-20 flex flex-col md:flex-row items-center justify-center gap-12">
                {/* Image Section - Add your image here */}
                <div className="w-full md:w-1/2 md:mt-40 flex justify-center">
                    <img 
                        src={faqImage} 
                        alt="FAQ Illustration" 
                        className="max-w-md w-full h-auto rounded-lg"
                    />
                </div>

                {/* FAQ Accordion Section */}
                <div className="w-full md:w-1/2 max-w-xl">
                    <h2 className="text-2xl font-bold mb-6 text-center text-white border-r-2 border-r-black typing-animation">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="border border-black rounded-lg overflow-hidden transition-all duration-300">
                                <button
                                    onClick={() => toggle(idx)}
                                    className="w-full text-left px-6 py-4 bg-black text-white hover:bg-gray-800 focus:outline-none font-semibold transition-colors duration-200 flex justify-between items-center"
                                    aria-expanded={openIndex === idx}
                                >
                                    <span>{faq.question}</span>
                                    <span className="text-xl">
                                        {openIndex === idx ? '−' : '+'}
                                    </span>
                                </button>
                                <div
                                    className={`bg-[#3e3e3e] text-white transition-all duration-300 ${
                                        openIndex === idx ? 'max-h-96 py-4 px-6' : 'max-h-0 py-0 px-6'
                                    }`}
                                >
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FAQAccordion;