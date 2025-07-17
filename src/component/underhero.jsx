import React, { useEffect, useState } from 'react'
import image from '../assets/citrus.png'
import imag from '../assets/trustly.png'
import img from '../assets/lifegroups.png'
import imagg from '../assets/belimo.png'
import lilly from '../assets/lilly.png'
import grapeyo from '../assets/grapeyo.png'
import myop from '../assets/myop.png'

export default function underhero() {
    const [hero, herosec] = useState(false)
    useEffect(() => {
        setTimeout(() => herosec(true), 100);

    }, [])
    return (
        <div
            className={`bg-[#f3f4f6] pt-7 pb-3 border-t border-gray-400 overflow-hidden transition-transform duration-1000 ease-out ${hero ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}
        >
            <div className="w-full">
                <div
                    className="flex items-center md:gap-40 gap-20 flex-nowrap overflow-x-auto scroll-smooth animate-scroll-slow"
                    style={{ WebkitOverflowScrolling: "touch" }}
                >
                    <img src={image} className="w-20 min-w-[5rem]" alt="" />
                    <img src={imag} className="w-20 min-w-[5rem]" alt="" />
                    <img src={img} className="w-20 min-w-[5rem]" alt="" />
                    <img src={imagg} className="w-20 min-w-[5rem]" alt="" />
                    <img src={lilly} className="w-20 min-w-[5rem]" alt="" />
                    <img src={grapeyo} className="w-20 min-w-[5rem]" alt="" />
                    <img src={myop} className="w-20 min-w-[5rem]" alt="" />
                    {/* Duplicate for seamless scroll */}
                    <img src={image} className="w-20 min-w-[5rem]" alt="" />
                    <img src={imag} className="w-20 min-w-[5rem]" alt="" />
                    <img src={img} className="w-20 min-w-[5rem]" alt="" />
                    <img src={imagg} className="w-20 min-w-[5rem]" alt="" />
                    <img src={lilly} className="w-20 min-w-[5rem]" alt="" />
                    <img src={grapeyo} className="w-20 min-w-[5rem]" alt="" />
                    <img src={myop} className="w-20 min-w-[5rem]" alt="" />

                    {/* Duplicate for seamless scroll */}
                    <img src={image} className="w-20 min-w-[5rem]" alt="" />
                    <img src={imag} className="w-20 min-w-[5rem]" alt="" />
                    <img src={img} className="w-20 min-w-[5rem]" alt="" />
                    <img src={imagg} className="w-20 min-w-[5rem]" alt="" />
                    <img src={lilly} className="w-20 min-w-[5rem]" alt="" />
                    <img src={grapeyo} className="w-20 min-w-[5rem]" alt="" />
                    <img src={myop} className="w-20 min-w-[5rem]" alt="" />

                </div>
            </div>
            <style>
                {`
                @keyframes scroll-slow {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll-slow {
                    animation: scroll-slow 60s linear infinite;
                }
                .flex::-webkit-scrollbar {
                    display: none;
                }
                @media (max-width: 768px) {
                    .animate-scroll-slow img {
                        width: 3.5rem;
                        min-width: 3.5rem;
                    }
                }
                `}
            </style>
        </div>
    )
}
