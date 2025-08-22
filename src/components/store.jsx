import React from 'react';

export default function Store() {
    return (
        <div className="relative py-16 bg-gray-100 min-h-[40rem]">
            <div className="absolute inset-0 bg-neutral-600 bg-opacity-70">
                <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 w-full">
                        <div className="text-white">
                            <h1 className="font-bold text-3xl md:text-4xl mb-4">Our Store</h1>
                            <div className="text-base md:text-lg space-y-3">
                                <p className="font-bold">Visit us or reach out—we're here to help you look your best!</p>
                                
                                <p className="font-bold">🛍 In-Store Shopping:</p>
                                <p>Monday – Friday: 10:00 AM – 8:00 PM</p>
                                <p>Saturday: 9:00 AM – 9:00 PM</p>
                                <p>Sunday: 11:00 AM – 6:00 PM</p>
                                
                                <p className="font-bold">Customer Support:</p>
                                <p>Phone/Email:</p>
                                <p>(+63) 962-529-5867</p>
                                <p>Mcmartinsltd@gmail.com</p>
                                
                                <p className="font-bold">Closed on public holidays.</p>
                                <p>Need assistance outside these hours? Leave us a message, and we'll respond within 24 hours.</p>
                            </div>
                        </div>
                        <div>
                            <a href="/contact">
                                <button className="bg-neutral-800 text-white px-6 py-4 rounded-full hover:bg-neutral-900 transition-colors duration-300 w-full md:w-auto">
                                    Reach out to us
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}