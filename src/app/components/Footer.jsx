"use client";

export default function Footer() {
  return (
    <footer className="bg-white text-white mt-24">
      {/* Wave full width on top; footer background starts below */}
      <div aria-hidden>
        <svg viewBox="0 0 1440 160" className="w-full h-24 md:h-32" preserveAspectRatio="none">
          <defs>
            {/* Exact colors aligned with tailwind from-blue-900 (#1e3a8a) to to-blue-800 (#1e40af) */}
            <linearGradient id="footerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#1e40af" />
            </linearGradient>
          </defs>
          <path d="M0,96 C240,24 480,24 720,64 C960,104 1200,104 1440,64 L1440,160 L0,160 Z" fill="url(#footerGrad)" />
        </svg>
      </div>

      <div className="bg-gradient-to-br from-blue-900 to-blue-800">
        <div className="max-w-7xl xl:max-w-[90%] mx-auto px-4 pt-10 pb-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Columns */}
            <div>
              <h4 className="text-xs 2xl:text-lg tracking-wider font-semibold text-white/80">PLATFORM</h4>
              <ul className="mt-4 space-y-2 text-sm 2xl:text-lg text-white/90">
                <li><a href="#" className="hover:text-cyan-300">Overview</a></li>
                <li><a href="#" className="hover:text-cyan-300">Pricing</a></li>
                <li><a href="#" className="hover:text-cyan-300">Supported technologies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs 2xl:text-lg tracking-wider font-semibold text-white/80">SOLUTIONS</h4>
              <ul className="mt-4 space-y-2 text-sm 2xl:text-lg text-white/90">
                <li><a href="#" className="hover:text-cyan-300">Overview</a></li>
                <li><a href="#" className="hover:text-cyan-300">Application monitoring</a></li>
                <li><a href="#" className="hover:text-cyan-300">Cloud monitoring</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs 2xl:text-lg tracking-wider font-semibold text-white/80">RESOURCES</h4>
              <ul className="mt-4 space-y-2 text-sm 2xl:text-lg text-white/90">
                <li><a href="#" className="hover:text-cyan-300">Overview</a></li>
                <li><a href="#" className="hover:text-cyan-300">Blog</a></li>
                <li><a href="#" className="hover:text-cyan-300">Customer stories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs 2xl:text-lg tracking-wider font-semibold text-white/80">SERVICES & SUPPORT</h4>
              <ul className="mt-4 space-y-2 text-sm 2xl:text-lg text-white/90">
                <li><a href="#" className="hover:text-cyan-300">Overview</a></li>
                <li><a href="#" className="hover:text-cyan-300">Success and Support</a></li>
                <li><a href="#" className="hover:text-cyan-300">Partner Hub</a></li>
              </ul>
            </div>
            {/* Map Card */}
            <div className="col-span-2 md:col-span-1 md:col-start-5">
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-blue-900/40 backdrop-blur">
                <iframe
                  title="Company location"
                  className="w-full h-40 md:h-44"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2622.5128994931324!2d2.3028616754678963!3d48.90561959738298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66f0d10ff2475%3A0xc2dd101a06dd88c9!2s6%20Rue%20des%20Bateliers%2C%2092110%20Clichy%2C%20France!5e0!3m2!1sfr!2stn!4v1757061524325!5m2!1sfr!2stn"
                />
                <div className="p-3 text-xs 2xl:text-lg text-white/90">
                  Confoline — 6 RUE DES BATELIERS 92110 CLICHY, France
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
            <p>© {new Date().getFullYear()} Confoline. All rights reserved</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-cyan-300">Confidentialité</a>
              <a href="#" className="hover:text-cyan-300">Conditions</a>
              <a href="#" className="hover:text-cyan-300">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}


