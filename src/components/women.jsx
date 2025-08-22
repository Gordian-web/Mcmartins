import React, { useState, useEffect } from "react";
import { useCart } from "../cart/cartcontext";
import image from '../assets/women.jpg';
import imag from '../assets/lofers.jpg';
import img from '../assets/girl.jpg';
import bag from '../assets/bag.jpg';
import eye from '../assets/eye-closed.png';
import shop from '../assets/shopping-basket (1).png';

export default function Women() {
    const [isVisible, setIsVisible] = useState(false);
    const { addToCart } = useCart();
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleAddToCart = (product) => {
        addToCart({
            ...product,
            id: `${product.id}-${Date.now()}` // Unique ID for each cart item
        });
        setNotification(`Added ${product.name} to cart!`);
        const timer = setTimeout(() => setNotification(null), 3000);
        return () => clearTimeout(timer);
    };

    const products = [
        {
            id: 1,
            name: "Fashion Forward Kicks",
            price: 49.99,
            description: "Trendy and comfortable sneakers designs.",
            image: image
        },
        {
            id: 2,
            name: "Penny Loafers",
            price: 79.99,
            description: "Classic penny loafers for a timeless and sophisticated look.",
            image: imag
        },
        {
            id: 3,
            name: "Hand Bag",
            price: 59.99,
            description: "Stylish and functional hand bags for your essentials.",
            image: bag
        },
        {
            id: 4,
            name: "Stylish dresses",
            price: 29.99,
            description: "Elegant and trendy dresses for any occasion.",
            image: img
        }
    ];

    return (
        <div className={`bg-white p-4 sm:p-8 md:p-12 lg:p-16 mt-20 md:mt-2 transition-transform duration-1000 ease-out ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
            {notification && (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg z-50 shadow-lg">
                    {notification}
                </div>
            )}

            <div className="max-w-7xl mx-auto text-center">
                <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        Women's Fashion
                    </h2>
                </div>
                <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12">
                    We offer premium fashionable accessories and designs for our female clients.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                            <div className="mb-4 flex justify-center">
                                <div className="w-full h-48 overflow-hidden rounded-lg">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-2 text-left">
                                {product.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 text-left">
                                {product.description}
                            </p>
                            <div className="mt-auto flex justify-between items-center">
                                <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="bg-black text-white cursor-pointer hover:bg-gray-800 px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors duration-300"
                                >
                                    Add to Cart
                                    <img
                                        src={shop}
                                        alt="Cart"
                                        className="invert w-4 h-4"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12">
                    <p className="text-lg text-gray-500 mb-6">
                        For the ladies, we have more fashionable designs not shown here. contact us for more.
                    </p>
                    <div className="flex justify-center">
                        <a
                            href="/contact"
                            className="px-6 py-2 bg-black rounded-lg text-white hover:bg-gray-800 transition duration-300 text-lg font-semibold flex items-center gap-2"
                        >
                            contact us
                            <img
                                src={eye}
                                alt="Gallery"
                                className="invert w-5 h-5"
                                aria-hidden="true"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}