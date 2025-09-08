"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
function HeroCarousel() {
    // Tableau des images pour le carrousel
    const images = [
        "images/employee1.jpg",
        "images/employee2.jpg",
        "images/employee3.jpg",
        "images/team.jpg",
        "images/employee3.jpg",
        "images/team.jpg",
        "images/employee1.jpg",
        "images/employee2.jpg",
    ];
    return (
        <div className="relative rounded-2xl p-8">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={8}  
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
                speed={8000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: true,
                    
                }}
                breakpoints={{
                    0: { slidesPerView: 1, spaceBetween: 8, centeredSlides: true },
                    640: { slidesPerView: 1.5, spaceBetween: 10 },
                    768: { slidesPerView: 2.5, spaceBetween: 12 },
                    1024: { slidesPerView: 3.5, spaceBetween: 12 },
                    1280: { slidesPerView: 4.5, spaceBetween: 14 },
                    1536: { slidesPerView: 5, spaceBetween: 16 },
                    1920: { slidesPerView: 5.5, spaceBetween: 18 }
                }}
                //  pagination={{
                //    clickable: true,
                //    dynamicBullets: true,
                //  }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                className="py-8 "
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative group h-105 2xl:h-120 flex items-center justify-center">
                            <div className={`relative overflow-hidden rounded-4xl shadow-2xl border border-white/10 transition-all duration-500 group-hover:scale-105 bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center ${index % 2 === 0
                                ? 'h-96 w-94 2xl:h-116 2xl:w-114' 
                                : 'h-64 w-78 2xl:h-84 2xl:w-98'
                                }`}>
                                <img
                                    src={image}
                                    alt={`AI Platform ${index + 1}`}
                                    className={`max-h-64 object-contain mx-auto block ${index % 2 === 0
                                        ? 'max-w-84'
                                        : 'max-w-64'
                                        }`}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div
                                    className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold rounded-xl"
                                    style={{ display: 'none' }}
                                >
                                    AI Platform {index + 1}
                                </div>

                                {/* Overlay avec titre */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-white font-semibold text-lg">AI Platform {index + 1}</h3>
                                        <p className="text-gray-200 text-sm">Advanced AI Solutions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default HeroCarousel