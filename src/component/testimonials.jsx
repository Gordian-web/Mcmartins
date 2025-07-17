import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import picture from '../assets/triumph.png';
import pic from '../assets/director.png.jpg';
import imag from '../assets/fashionist.png.jpg';

export default function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Triumph Martins",
      role: "CEO and Founder",
      rating: 5,
      comment: "Building a brand where fashion meets identity.",
      image: picture
    },
    {
      id: 2,
      name: "Martins Umoh",
      role: "Managing director",
      rating: 4,
      comment: "Behind every smooth move, there's smart leadership. ",
      image: pic
    },
    {
      id: 3,
      name: "Favour Martins",
      role: "Fashion Specialist",
      rating: 3,
      comment: "Bringing the brand's soul to life, one outfit at a time .",
      image: imag
    },
  ];

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className="py-12 bg-[#f9fafb] relative">
      <div className="max-w-4xl mx-auto relative">
        {/* Static Heading */}
        <div className="text-center mb-10">
          <h1 className='text-4xl font-bold mb-2'>Team</h1>
          <p className='font-semibold text-gray-400'>
            From vision to fashion, insights from our core team
          </p>
        </div>

        {/* Swiper for Image and Testimonial Content */}
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          pagination={{ 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet bg-gray-300',
            bulletActiveClass: 'swiper-pagination-bullet-active bg-blue-500'
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ 
            delay: 5000,
            disableOnInteraction: false
          }}
          speed={800}
          onSlideChange={handleSlideChange}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="text-center p-4 rounded-lg mx-4">
                {/* Image on Top */}
                <div className="mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="mx-auto rounded-full w-40 h-40 md:w-60 md:h-60 object-top object-cover border-4 border-white shadow-md"
                  />
                </div>
                
                {/* Testimonial Text Below */}
                <div>
                  <h3 className="font-bold text-xl text-gray-800">{testimonial.name}</h3>
                  <p className="text-gray-500 mb-2">{testimonial.role}</p>
                  <div className="flex justify-center my-3 text-yellow-400 text-xl">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < testimonial.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <p className="italic mb-6 text-gray-600">
                    "{testimonial.comment}"
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}