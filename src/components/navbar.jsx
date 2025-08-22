import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useCart } from "../cart/cartcontext";
import Cart from "../cart/cart";
import logo from '../assets/web logo.jpg';
import menu from '../assets/menu.png';
import x from '../assets/x.png';
import contact from '../assets/user-round-search.png';
import shop from '../assets/shopping-basket (1).png';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [showNav, setShowNav] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { cart } = useCart();
    const cartRef = useRef(null);
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    useEffect(() => {
        setTimeout(() => setShowNav(true), 100);
    }, []);

    // Close cart when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                const cartIcon = event.target.closest('.cart-icon-container');
                if (!cartIcon) {
                    setIsCartOpen(false);
                }
            }
        };

        if (isCartOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCartOpen]);

    const handleLogout = () => {
        // Clear authentication token
        localStorage.removeItem('mcm_auth_token');
        // Clear cart if needed
        // localStorage.removeItem('cart');
        
        // Redirect to login page
        navigate('/login', { replace: true });
        
        // Optional: Refresh the page to reset all states
        window.location.reload();
    };

    const navLinks = [
        { text: "Home", href: "/" },
        { text: "About", href: "/about" },
        { text: "contact", href: "/contact" },
        { text: "Gallery", href: "/Gallery" },
    ];

    return (
        <>
            <nav className={`bg-black p-4 shadow-2xl fixed w-full z-50 transition-all duration-1000 ${showNav ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img
                            src={logo}
                            alt="Logo"
                            className="rounded-full w-16 h-16 object-cover"
                        />
                    </div>

                    <div className="hidden lg:flex items-center space-x-6 mx-6">
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="text-white px-4 py-2 font-semibold hover:text-black hover:bg-white hover:rounded-3xl transition-all duration-300"
                            >
                                {link.text}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center space-x-6">
                        <button 
                            onClick={handleLogout} 
                            className="text-black rounded-full not-lg:hidden bg-white px-6 font-bold flex gap-3 py-3 hover:bg-gray-200 transition-colors duration-300"
                        >
                            Log out
                            <img src={contact} alt="Logout" />
                        </button>
                        
                        {/* Cart with badge */}
                        <div className='relative cart-icon-container'>
                            <div className='flex items-center justify-center rounded-full bg-white w-12 h-12 hover:bg-gray-200 transition-colors duration-300'>
                                <button onClick={toggleCart} className="p-2">
                                    <img
                                        src={shop}
                                        alt="Shopping cart"
                                        className='cursor-pointer'
                                    />
                                    {cart.length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {cart.length}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <button
                            onClick={toggleMenu}
                            className="lg:hidden p-2 rounded-md text-white focus:outline-none"
                            aria-expanded={isOpen}
                        >
                            {isOpen ? (
                                <img
                                    src={x}
                                    width={37}
                                    height={37}
                                    alt="Close menu"
                                    className="invert transform rotate-180 transition-transform duration-300 ease-in-out opacity-80"
                                />
                            ) : (
                                <img
                                    src={menu}
                                    width={37}
                                    height={37}
                                    alt="Open menu"
                                    className="invert transform transition-transform duration-300 ease-in-out opacity-80"
                                />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden transform left-0 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-2xl  
                               ${isOpen
                        ? "max-h-[500px] opacity-100 scale-y-100 translate-y-0"
                        : "max-h-0 opacity-0 scale-y-95 -translate-y-4 pointer-events-none"
                    } origin-top`}
                    style={{ transitionProperty: "max-height, opacity, transform" }}
                >
                    <div className="px-4 pt-2 pb-6 space-y-2 bg-white shadow-lg translate-x-0 rounded-lg w-full max-w-xs">
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="block px-4 py-3 text-gray-700 hover:bg-black hover:text-white rounded-lg font-medium transition-colors duration-300"
                            >
                                {link.text}
                            </a>
                        ))}
                        <button 
                            onClick={handleLogout} 
                            className="w-full bg-black text-white px-4 py-3 gap-3 flex rounded-full hover:bg-gray-800 transition-colors duration-300"
                        >
                            log out
                            <img src={contact} alt="" className="invert"/>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Cart Modal */}
            {isCartOpen && (
                <div className="fixed inset-0 z-[60]">
                    <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
                    <div ref={cartRef} className="absolute right-0 h-full bg-white w-full max-w-md overflow-y-auto">
                        <Cart onClose={() => setIsCartOpen(false)} />
                    </div>
                </div>
            )}
        </>
    );
}