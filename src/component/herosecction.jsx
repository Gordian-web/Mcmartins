import React, { useEffect,useState } from 'react'
import heroimg from '../assets/fashion.jpg'
import shop from '../assets/shopping-basket (1).png'




export default function Herosecction() {
      const [herotext, setherotext] = useState(false);
      useEffect(() => {
        setTimeout(() => setherotext(true), 100)
      },[])
      

      const heroSectionStyle = {
        backgroundImage: `url(${heroimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
  
  return (
    <div style={heroSectionStyle} className="relative h-screen">
      {/* Overlay with reduced opacity */}
      <div className="absolute inset-0  bg-opacity-60">
      <div className={`relative h-full flex items-center justify-center transition-all duration-1000 ${ herotext ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
        <div className="text-center mt-15">
          <h1 className="text-4xl text-white font-bold mb-4">Welcome to mcmartins fashion ltd.</h1>
          <p className="text-lg mb-8 font-bold text-white">Discover the latest trends in our work and safety shoe category.</p>
          <a className="flex  bg-black w-40 text-white hover:bg-gray-900 px-4 py-2 rounded-full items-center justify-center gap-2 transition-colors duration-300"
          href="/gallery">
            Shop Now <img src={shop} alt="" className='invert'/>
          </a>
        </div>
      </div>
    </div>
    </div>
  )
}
