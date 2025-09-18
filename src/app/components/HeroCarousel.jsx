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
        <div className="relative rounded-3xl ">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={32}  
                slidesPerView={1}
                centeredSlides={true}
                loop={true}
                speed={8000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: true,
                    
                }}
                breakpoints={{
                    0: { slidesPerView: 1,centeredSlides: true },
                    640: { slidesPerView: 1.5,centeredSlides: true},
                    768: { slidesPerView: 2.5,centeredSlides: true },
                    1024: { slidesPerView: 3.5,centeredSlides: true},
                    1280: { slidesPerView: 4.5,centeredSlides: true },
                    1536: { slidesPerView: 5.5,centeredSlides: true},
                    1920: { slidesPerView: 5.5,centeredSlides: true }
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                className="py-8"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="group h-105 2xl:h-120 flex items-center justify-center">
                            <div className={`overflow-hidden rounded-3xl border border-white/10 transition-all duration-500 group-hover:scale-105  flex items-center justify-center`}>
                                <img
                                    src={image}
                                    alt={`AI Platform ${index + 1}`}
                                    className={`object-cover mx-auto block ${index % 2 === 0
                                        ? 'w-76 h-63 2xl:w-116 2xl:h-103'
                                        : 'w-76 h-74 2xl:w-116 2xl:h-114'
                                        }`}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />

                                {/* Overlay avec titre */}
                                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-white font-semibold text-lg">AI Platform {index + 1}</h3>
                                        <p className="text-gray-200 text-sm">Advanced AI Solutions</p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default HeroCarousel