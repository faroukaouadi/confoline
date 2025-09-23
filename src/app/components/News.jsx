"use client";

export default function News() {
  return (
    <section className="bg-gradient-to-br from-blue-950 to-blue-900 text-white">
      <div className="max-w-7xl 2xl:max-w-[80%] mx-auto px-4 py-16 2xl:py-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 ">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl  font-bold leading-tight">
              <span className="text-cyan-400 ">Latest</span> news
              <br />
              and innovations
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <button className="bg-blue-400 hover:bg-blue-300 cursor-pointer text-white px-8 py-3 rounded-full font-medium transition-colors 2xl:text-[24px]">View Blogs</button>
            <button className="border-2 border-cyan-300/60 text-white cursor-pointer hover:bg-cyan-300/10 hover:text-white px-8 py-3 rounded-full font-medium transition-colors 2xl:text-[24px]">View Analyst Reports</button>
          </div>
        </div>

        {/* Grid: left large card, right two stacked */}
        <div className="grid md:grid-cols-2 md:grid-rows-2 gap-6">
          {/* Left big card */}
          <article className="md:col-span-1 md:row-span-2 rounded-2xl overflow-hidden bg-blue-800">
            {/* Top image */}
            <div className="bg-[linear-gradient(180deg,#0C1B46_0%,#0065A1_30.76%,#0C1B46_100%)] h-46 sm:h-56 2xl:h-86 flex justify-center items-center">
            <img src="/images/team.jpg" alt="Report hero" className="w-10/12 h-9/12  object-cover" />
            </div>
            <div className="p-6 sm:p-8 2xl:p-10 h-full flex flex-col ">
              <span className="text-xs 2xl:text-lg uppercase tracking-widest text-white/70">Report</span>
              <h3 className="mt-2 text-sm sm:text-xl md:text-2xl 2xl:text-4xl font-semibold">
                2025 Gartner Critical Capabilities for Enterprise Low‑Code Applications
              </h3>
              <p className="mt-3 text-white/80 line-clamp-3 text-xs lg:text-base 2xl:text-lg">
                Discover why ServiceNow was ranked #1 for Building and Managing AI Agents Use Case in the 2025 report.
              </p>
              <div className="pt-4">
                <button className="text-cyan-300 hover:text-cyan-200 text-xs lg:text-base 2xl:text-lg inline-flex items-center gap-2">
                  Read Report
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          </article>

          {/* Top right card */}
          <article className="rounded-2xl overflow-hidden bg-blue-800">
            <div className="h-full flex">
              <div className="w-5/12 h-full flex justify-center items-center bg-[linear-gradient(180deg,#0C1B46_0%,#0065A1_30.76%,#0C1B46_100%)]">
              <img src="/images/employee2.jpg" alt="Elastic report" className="w-10/12 h-9/12 object-cover" />
              </div>
              <div className="p-6 2xl:p-8 h-full flex flex-col flex-1">
                <span className="text-xs 2xl:text-lg uppercase tracking-widest text-white/70">Report</span>
                <h3 className="mt-2 text-xs sm:text-lg 2xl:text-3xl font-semibold">
                  2025 Gartner Magic Quadrant for Enterprise Low‑Code Application
                </h3>
                <div className="mt-auto pt-4">
                  <button className="text-cyan-300 hover:text-cyan-200 text-xs lg:text-base 2xl:text-lg inline-flex items-center gap-2">
                    Read Report
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Bottom right card */}
          <article className="rounded-2xl overflow-hidden bg-blue-800">
            <div className="h-full flex">
            <div className="w-5/12 h-full flex justify-center items-center bg-[linear-gradient(180deg,#0C1B46_0%,#0065A1_30.76%,#0C1B46_100%)]">
              <img src="/images/employee2.jpg" alt="IDC report" className="w-10/12 h-9/12 object-cover" />
            </div>
              <div className="p-6 2xl:p-8 h-full flex flex-col flex-1">
                <span className="text-xs 2xl:text-lg uppercase tracking-widest text-white/70">Report</span>
                <h3 className="mt-2 text-xs sm:text-lg 2xl:text-3xl font-semibold">
                  IDC MarketScape: Worldwide Business Automation Platforms 2025 Vendor Assessment
                </h3>
                <div className="mt-auto pt-4">
                  <button className="text-cyan-300 hover:text-cyan-200 text-xs lg:text-base 2xl:text-lg inline-flex items-center gap-2">
                    Read Report
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Mobile buttons */}
        <div className="mt-6 flex sm:hidden items-center justify-center gap-3">
          <button className="px-4 py-2 rounded-full bg-cyan-500 text-white hover:bg-cyan-400 transition-colors text-sm font-medium">View Blogs</button>
          <button className="px-4 py-2 rounded-full bg-cyan-500 text-white hover:bg-cyan-400 transition-colors text-sm font-medium">View Analyst Reports</button>
        </div>
      </div>
    </section>
  );
}


