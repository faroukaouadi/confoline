"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Globe, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinkClass = (href) =>
    `hover:text-blue-300 flex items-center gap-1 ${pathname && pathname.startsWith(href) ? "text-blue-300" : ""}`;

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-br from-blue-950 to-blue-900 text-white shadow-md">
      <div className="max-w-[90%] mx-auto flex justify-between items-center p-4 2xl:p-6">
        {/* Logo */}
        <div className="cursor-pointer">
          <Link href="/">           
            <Image src="/images/confoline-logo.png" alt="confoline" width={150} height={40} className="object-contain 2xl:w-44 select-none" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex space-x-6 2xl:space-x-8 font-medium text-sm 2xl:text-[24px]">
          <Link href="/services" className={navLinkClass("/services")}>
            Services <ChevronDown size={16} />
          </Link>
          <Link href="/industries" className={navLinkClass("/industries")}>
            Industries <ChevronDown size={16} />
          </Link>
          <Link href="/customers" className={navLinkClass("/customers")}>
            Customers <ChevronDown size={16} />
          </Link>
          <Link href="/support" className={navLinkClass("/support")}>
            Support <ChevronDown size={16} />
          </Link>
          <Link href="/partners" className={navLinkClass("/partners")}>
            Partners <ChevronDown size={16} />
          </Link>
          <Link href="#" className="hover:text-blue-300 flex items-center gap-1">
            Company <ChevronDown size={16} />
          </Link>
        </nav>
        
        {/* Right side utilities */}
        <div className="hidden lg:flex items-center space-x-4 2xl:space-x-6">
          <button className="p-1.5 sm:p-2 hover:bg-blue-800 rounded-full">
            <Search size={18} className="text-white 2xl:size-7"/>
          </button>
          {/* <button className="p-1.5 sm:p-2 hover:bg-blue-800 rounded-full">
            <Globe size={18} className="text-white" />
          </button>
          <button className="text-white hover:text-blue-300 font-medium text-xs sm:text-sm 2xl:text-base">
            Sign In
          </button> */}
          <button className=" w-31 h-11 2xl:w-51 2xl:h-18 bg-[#51A2FF] hover:bg-blue-300 rounded-full font-medium cursor-pointer transition-colors text-sm 2xl:text-[24px]">
            Get Started
          </button>
        </div>

        {/* Mobile menu */}
        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28}/> : <Menu size={28}/>}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="lg:hidden bg-gradient-to-br from-blue-950 to-blue-900 px-4 pb-4 space-y-2">
          <Link href="/services" className={`block py-2 ${pathname && pathname.startsWith("/services") ? "text-blue-300" : ""}`}>Services</Link>
          <Link href="/industries" className={`block py-2 ${pathname && pathname.startsWith("/industries") ? "text-blue-300" : ""}`}>Industries</Link>
          <Link href="/customers" className={`block py-2 ${pathname && pathname.startsWith("/customers") ? "text-blue-300" : ""}`}>Customers</Link>
          <Link href="/support" className={`block py-2 ${pathname && pathname.startsWith("/support") ? "text-blue-300" : ""}`}>Support</Link>
          <Link href="/partners" className={`block py-2 ${pathname && pathname.startsWith("/partners") ? "text-blue-300" : ""}`}>Partners</Link>
          <Link href="#" className="block py-2">Company</Link>
          <button className="w-full mt-3 bg-blue-400 px-6 py-2 rounded-md hover:bg-blue-300 cursor-pointer">
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}
