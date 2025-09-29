"use client"
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
function HeroCarousel() {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()
        async function load() {
            try {
                setLoading(true)
                setError(null)
                const apiUrl = process.env.NODE_ENV === 'development' 
                  ? 'http://127.0.0.1:8000/admin/confoline-Api/gallery.php'
                  : '/admin/confoline-Api/gallery.php'
                const res = await fetch(apiUrl, { signal: controller.signal, headers: { 'Accept': 'application/json' }, cache: 'no-store' })
                if (!res.ok) throw new Error('Failed to fetch gallery')
                const json = await res.json()
                if (json && json.success && Array.isArray(json.data)) {
                    setImages(json.data)
                } else {
                    throw new Error('Invalid response format')
                }
            } catch (e) {
                if (e.name !== 'AbortError') setError(e.message || 'Error loading gallery')
            } finally {
                setLoading(false)
            }
        }
        load()
        return () => controller.abort()
    }, [])

    return (
        <div className="relative rounded-3xl ">
            {loading && <div className="text-center text-white/70 py-8">Loading...</div>}
            {error && <div className="text-center text-red-400 py-8">{error}</div>}
            {!loading && !error && (
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
                {images.map((item, index) => (
                    <SwiperSlide key={item.id || index}>
                        <div className="group h-105 2xl:h-120 flex items-center justify-center">
                            <div className={`overflow-hidden rounded-3xl border border-white/10 transition-all duration-500 group-hover:scale-105  flex items-center justify-center`}>
                                <img
                                    src={item.src}
                                    alt={item.alt || `Gallery ${index + 1}`}
                                    className={`object-cover mx-auto block ${index % 2 === 0
                                        ? 'w-76 h-63 2xl:w-116 2xl:h-93'
                                        : 'w-76 h-74 2xl:w-116 2xl:h-104'
                                        }`}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling && (e.target.nextSibling.style.display = 'flex');
                                    }}
                                />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            )}
        </div>
    )
}

export default HeroCarousel