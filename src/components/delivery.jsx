import React from 'react'
import delivery from '../assets/delivery.png.jpg'
import del from '../assets/del.jpg'

export default function Delivery() {
  return (
    <div className="bg-[#294143]">
      <div className="relative max-w-7xl mx-auto px-4 py-6 flex items-center h-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 w-full">
          <div className="w-full md:w-1/2">
            <h1 className="font-bold text-white text-2xl sm:text-3xl md:text-4xl mb-4 flex items-center">
              Delivery Method
              <img
                src={del}
                alt=""
                className="w-8 h-8 sm:w-10 sm:h-10 ml-3 sm:ml-5 animate-spin rounded-full"
              />
            </h1>
            <p className="text- sm:text-base md:text-lg text-white mt-6 sm:mt-">
              <br className="hidden sm:block" />
              At McMartin, we bring the latest trends to you with fast, secure, and hassle-free delivery.
              <br className="hidden sm:block" />
              Whether you're refreshing your wardrobe or shopping for a special occasion, your order is handled with care from our store to your doorstep.
              <br className="hidden sm:block" />
            </p>
            <p className='font-bold mt-5 text-white'>Delivery Options:
            </p>
            <ul className="list-disc list-inside text-sm sm:text-base md:text-lg text-white mt-2">
              <li>Standard Delivery: 3-5 business days</li>
              <li>Express Delivery: 1-2 business days</li>
              <li>Same-Day Delivery: Available in select areas</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-10 flex justify-center">
            <img
              src={delivery}
              className="w-4/5 sm:w-full max-w-xs sm:max-w-md h-auto object-cover rounded-xl animate-bounce-slow object-top"
              alt=""
            />
          </div>
        </div>
      </div>
      <style>
        {`
        @keyframes bounce-slow {
        0%, 100% {
          transform: translateY(0);
          animation-timing-function: cubic-bezier(0.8,0,1,1);
        }
        50% {
          transform: translateY(-20px);
          animation-timing-function: cubic-bezier(0,0,0.2,1);
        }
        }
        .animate-bounce-slow {
        animation: bounce-slow 3s infinite;
        }
      `}
      </style>
    </div>
  )
}
