"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sean Edwards",
    role: "CEO Of Acme Industries",
    quote: "Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't lookLorem Ipsum available, but t",
    date: "12/03/2025",
    avatar: "/images/employee1.jpg"
  },
  {
    id: 2,
    name: "Matthew Hills",
    role: "Owner Of Artimia",
    quote: "Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't lookLorem Ipsum available, but t",
    date: "12/03/2025",
    avatar: "/images/employee2.jpg"
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "Founder Of Fusion Zone",
    quote: "Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't lookLorem Ipsum available, but t",
    date: "12/03/2025",
    avatar: "/images/employee3.jpg"
  },
  {
    id: 4,
    name: "David Chen",
    role: "CTO Of TechFlow",
    quote: "Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't lookLorem Ipsum available, but t",
    date: "12/03/2025",
    avatar: "/images/employee1.jpg"
  },
  {
    id: 5,
    name: "Lisa Martinez",
    role: "Director Of Innovation",
    quote: "Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't lookLorem Ipsum available, but t",
    date: "12/03/2025",
    avatar: "/images/employee2.jpg"
  },
  {
    id: 6,
    name: "Michael Brown",
    role: "VP Of Operations",
    quote: "Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't lookLorem Ipsum available, but t",
    date: "12/03/2025",
    avatar: "/images/employee3.jpg"
  }
];

export default function Testimonials() {

  return (
    <section className="relative py-16 sm:py-20 2xl:py-24">
      <div className="mx-auto max-w-[90%] py-15 2xl:py-20 rounded-4xl bg-[linear-gradient(180deg,#0C1B46_0%,#0065A1_30.76%,#0C1B46_100%)] px-6 sm:px-8 lg:px-10">
        {/* Title */}
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-12">
          What Our Customers are Saying
        </h2>

        {/* Swiper Container */}
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="testimonials-swiper"
          >
            {TESTIMONIALS.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-[#162456] border border-blue-400/30 rounded-xl p-6 backdrop-blur-sm hover:bg-blue-900/60 transition-all duration-300 h-full cursor-grab">
                  {/* Profile Section */}
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="relative w-12 h-12 2xl:w-20 2xl:h-20 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-white font-bold text-lg 2xl:text-xl">{testimonial.name}</h3>
                      <p className="text-blue-200 text-sm 2xl:text-lg">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-white italic text-center text-sm 2xl:text-lg leading-relaxed mb-4">
                    {testimonial.quote}
                  </p>

                  {/* Date */}
                  <div className="text-center">
                    <span className="text-blue-300 text-xs 2xl:text-lg">{testimonial.date}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons - Hidden on mobile */}
          <div className="swiper-button-prev !text-white !bg-white/10 !rounded-full !w-12 !h-12 !mt-0 !top-1/2 !-translate-y-1/2 !left-0 hover:!bg-white/20 transition-all duration-300 !hidden md:!block"></div>
          <div className="swiper-button-next !text-white !bg-white/10 !rounded-full !w-12 !h-12 !mt-0 !top-1/2 !-translate-y-1/2 !right-0 hover:!bg-white/20 transition-all duration-300 !hidden md:!block"></div>
          
          {/* Custom Pagination */}
          <div className="swiper-pagination !relative !mt-8 !bottom-0"></div>
        </div>
      </div>
    </section>
  );
}