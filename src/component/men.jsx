import React, { useState, useEffect } from "react";
import { useCart } from "../cart/cartcontext";
import image from '../assets/about.png';
import img from '../assets/nikeairforce.png';
import images from '../assets/jordan.png';
import imag from '../assets/drmartens.jpg';
import contact from '../assets/user-round-search.png';
import shop from '../assets/shopping-basket (1).png';

export default function Mens() {
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
            name: "Shirts and Shorts",
            price: 49.99,
            description: "Stylish and comfortable shirts and shorts for your casual outings.",
            image: image
        },
        {
            id: 2,
            name: "Nike Air Force",
            price: 79.99,
            description: "Classic Nike Air Force sneakers that combine comfort and style for everyday wear.",
            image: img
        },
        {
            id: 3,
            name: "Jordan Air",
            price: 59.99,
            description: "Trendy Jordan sneakers that elevate your streetwear game with iconic designs.",
            image: images
        },
        {
            id: 4,
            name: "Dr. Martens",
            price: 129.99,
            description: "Iconic Dr. Martens boots known for their durability and timeless style.",
            image: imag
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
                        Men's Collection
                    </h2>
                </div>
                <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12">
                    Premium fashion selections curated for the modern gentleman
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
                        Discover more exclusive pieces in our gallery collection
                    </p>
                    <div className="flex justify-center">
                        <a
                            href="/gallery"
                            className="px-6 py-2 bg-black rounded-lg text-white hover:bg-gray-800 transition duration-300 text-lg font-semibold flex items-center gap-2"
                        >
                            View Gallery 
                            <img 
                                src={contact} 
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