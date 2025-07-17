import { useState, useEffect } from 'react';
import image from '../assets/abbout.jpg';

const About = () => {

  const [View, setcontact] = useState(false);
  useEffect(() => {
    setTimeout(() => setcontact(true), 100);
  }, []);



  return (
    <div className="border-t border-gray-800 bg-[#f3f4f6]">
      <div
        className={`max-w-7xl container mx-auto p-4 md:mt-30 mt-25 transition-transform duration-1000 ease-out ${View ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
          }`}
      >
        <h1 className="text-3xl font-bold mb-4 text-black text-center">
          About us
        </h1>
        <div className="flex flex-col md:flex-row gap-6 text-gray-600 mt-10">
          <div className="flex-1 order-2 md:order-1 flex items-center mt-10">
            <img
              src={image}
              alt=""
              className="w-full h-100 object-cover  object-top rounded-lg animate-bounce-slow"
            />
          </div>
          <div className="flex-1 order-1 md:order-2 flex items-center font-bold">
            <p>
              <span className='font-bold text-2xl text-black'> MCmartins ltd</span> <br />
              At McMartins Fashion Ltd, we believe that fashion is more than just clothing, it's a statement of individuality, confidence, and creativity. Since our founding, we have been committed to delivering high quality, stylish, and trendsetting apparel that caters to diverse tastes and lifestyles.
              Our collections blend contemporary designs with timeless elegance, ensuring that every piece reflects sophistication, comfort, and versatility. From chic everyday wear to standout statement pieces, we strive to inspire confidence in every individual who wears our brand.
                <h1 className='text-xl mt-5'>You might also wanna see frequently asked questions from people.</h1>
              <div className='mt-10'>
                <a
                href='/read'
                className= '  border  px-8 py-4 hover:bg-neutral-800  border-black text-white bg-black  rounded-lg'>
                  <a href="/read">view  More</a>
                </a>
              </div>
            </p>
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
  );
};

export default About;