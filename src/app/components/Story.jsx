"use client";

import Link from "next/link";

export default function Story() {
  return (
    <section className="relative bg-[url('/images/bg-story.png')] bg-cover bg-center bg-no-repeat">
       {/* Overlay  */}
      <div className="absolute inset-0 bg-[#CDE4FF66]"></div>

      <div className="relative z-10 max-w-5xl 2xl:max-w-[80%] mx-auto px-4 py-22 2xl:py-32 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-extrabold text-gray-900">
        We change the way business works
        </h2>
        <p className="mt-3 text-sm sm:text-base md:text-lg 2xl:text-2xl text-gray-900">
        See how our clients are accelerating growth, driving innovation,
          <br />
          and building future-ready IT strategies with Confoline.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4">
          <Link href="/company" className="px-4 py-2 sm:px-5 sm:py-2.5 2xl:px-6 2xl:py-3 cursor-pointer rounded-full border border-gray-900 text-gray-900 font-medium hover:bg-gray-50 text-sm sm:text-base">
            View all stories
          </Link>
          <Link href="/services" className="inline-flex items-center gap-1.5 sm:gap-2 cursor-pointer text-gray-900 hover:text-white font-medium text-xs sm:text-sm 2xl:text-base">
            See what we deliver
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-900 text-white text-xs">▶</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
