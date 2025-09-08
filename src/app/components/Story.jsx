"use client";

export default function Story() {
  return (
    <section className="bg-white">
      <div className="max-w-5xl 2xl:max-w-[80%] mx-auto px-4 py-16 2xl:py-20 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-extrabold text-gray-900">
          Built to drive every business forward
        </h2>
        <p className="mt-3 text-sm sm:text-base md:text-lg 2xl:text-xl text-gray-600">
          See how customers are accelerating growth, driving innovation, and
          delivering experiences their customers love with Dynatrace.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4">
          <button className="px-4 py-2 sm:px-5 sm:py-2.5 2xl:px-6 2xl:py-3 rounded-md border border-gray-300 text-gray-900 font-medium hover:bg-gray-50 text-sm sm:text-base">
            View all stories
          </button>
          <button className="inline-flex items-center gap-1.5 sm:gap-2 text-blue-600 hover:text-blue-500 font-medium text-xs sm:text-sm 2xl:text-base">
            See what we deliver
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs">▶</span>
          </button>
        </div>
      </div>
    </section>
  );
}
