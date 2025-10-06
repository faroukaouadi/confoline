import Link from "next/link";
import {MapPin} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900 py-10 2xl:py-20">
      <div className="max-w-[90%] mx-auto px-4">
        {/* Content grid */}
        <div className="grid gap-6 lg:gap-6 lg:grid-cols-6">
          {/* Links columns */}
          <div className="lg:col-span-4">
            {/* Inner top divider */}
            <div className="h-px bg-gray-400 mb-8" />

            {/* Links grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
              <h3 className="text-sm 2xl:text-lg font-bold tracking-wider text-gray-900 mb-4">PLATFORM</h3>
              <ul className="space-y-3 text-[13px] 2xl:text-[18px]">
                <li><Link href="#" className="hover:underline">Overview</Link></li>
                <li><Link href="#" className="hover:underline">Pricing</Link></li>
                <li><Link href="#" className="hover:underline">Supported technologies</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm 2xl:text-lg font-semibold tracking-wider text-gray-900 mb-4">SOLUTIONS</h3>
              <ul className="space-y-3 text-[13px] 2xl:text-[18px]">
                <li><Link href="#" className="hover:underline">Overview</Link></li>
                <li><Link href="#" className="hover:underline">Application monitoring</Link></li>
                <li><Link href="#" className="hover:underline">Cloud monitoring</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm 2xl:text-lg font-semibold tracking-wider text-gray-900 mb-4">RESOURCES</h3>
              <ul className="space-y-3 text-[13px] 2xl:text-[18px]">
                <li><Link href="#" className="hover:underline">Overview</Link></li>
                <li><Link href="#" className="hover:underline">Blog</Link></li>
                <li><Link href="#" className="hover:underline">Customer stories</Link></li>
              </ul>
            </div>

            <div className="sm:col-span-2 md:col-span-1">
              <h3 className="text-sm 2xl:text-lg font-semibold tracking-wider text-gray-900 mb-4">SERVICES & SUPPORT</h3>
              <ul className="space-y-3 text-[13px] 2xl:text-[18px]">
                <li><Link href="#" className="hover:underline">Overview</Link></li>
                <li><Link href="#" className="hover:underline">Success and Support</Link></li>
                <li><Link href="#" className="hover:underline">Partner Hub</Link></li>
              </ul>
            </div>

            {/* Social icons */}
              <div className="col-span-2 flex items-center gap-3 mt-2">
               <a aria-label="LinkedIn" href="#" className="p-1 rounded-full text-[#51A2FF] hover:bg-white/10">
                <svg width="18" height="18" className="2xl:w-6 2xl:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.1c0-1.7-.03-3.9-2.38-3.9-2.38 0-2.75 1.86-2.75 3.77V24h-4V8z"/></svg>
              </a>
               <a aria-label="YouTube" href="#" className="p-1 rounded-full text-[#51A2FF] hover:bg-white/10">
                <svg width="18" height="18" className="2xl:w-6 2xl:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.003 3.003 0 0 0-2.113-2.126C19.595 3.5 12 3.5 12 3.5s-7.595 0-9.385.56A3.003 3.003 0 0 0 .502 6.186C0 7.98 0 12 0 12s0 4.02.502 5.814a3.003 3.003 0 0 0 2.113 2.126C4.405 20.5 12 20.5 12 20.5s7.595 0 9.385-.56a3.003 3.003 0 0 0 2.113-2.126C24 16.02 24 12 24 12s0-4.02-.502-5.814zM9.75 15.5v-7l6 3.5-6 3.5z"/></svg>
              </a>
            </div>
            </div>

            {/* Inner bottom divider */}
            <div className="mt-8 h-px bg-gray-400" />

            {/* Bottom bar (inside same column) */}
            <div className="py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-[12px] 2xl:text-[18px]">
              <div className="flex gap-6 mb-3 sm:mb-0">
                <Link href="#" className="hover:underline">Confidentiality</Link>
                <Link href="#" className="hover:underline">Terms</Link>
                <Link href="#" className="hover:underline">Cookies</Link>
              </div>
              <p className="text-gray-900">© {new Date().getFullYear()} Confoline. All rights reserved  </p>
            </div>
          </div>

          {/* Map card */}
          <div className="lg:col-span-2 flex justify-center md:justify-end">
            <div className="bg-[#0A2A57] text-white rounded-xl p-2 sm:p-3 shadow-xl ring-1 ring-black/10 max-w-xs 2xl:max-w-lg w-full">
              <div className="relative w-full h-32 sm:h-47 2xl:h-51 rounded-lg overflow-hidden">
                <iframe
                  title="Confoline location"
                  className="absolute inset-0 w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2621.483831569379!2d2.3045!3d48.9032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66f50c6f2a22f%3A0x0000000000000000!2s6%20Rue%20des%20Bateliers%2C%2092110%20Clichy%2C%20France!5e0!3m2!1sen!2sfr!4v1700000000000"
                />
              </div>
              <div className="flex items-start gap-2 text-[12px] sm:text-sm mt-3">
                <MapPin />
                <div>
                  <p className="font-medium">Confoline — 6 RUE DES BATELIERS</p>
                  <p className="text-white/80">92110 CLICHY, France</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}


