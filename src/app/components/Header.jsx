"use client";

import { useState } from "react";
import { Menu, X, Search, Globe, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-br from-blue-950 to-blue-900 text-white shadow-md">
      <div className=" max-w-7xl 2xl:max-w-[90%] mx-auto flex justify-between items-center p-4 2xl:p-6">
        {/* Logo */}
        <div className="text-xl sm:text-2xl 2xl:text-3xl font-bold cursor-pointer">
          <Link href="/" >
            {/* <span className="text-white">confoline</span> */}
            <Image src="/images/confoline-logo.png" alt="confoline" width={150} height={40} className="object-contain" />
            {/* <span className="text-blue-400">.</span> */}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex space-x-6 2xl:space-x-8 font-medium text-sm 2xl:text-xl">
          <Link href="/services" className="hover:text-blue-300 flex items-center gap-1">
            Services <ChevronDown size={16} />
          </Link>
          <Link href="industries" className="hover:text-blue-300 flex items-center gap-1">
            Industries <ChevronDown size={16} />
          </Link>
          <Link href="customers" className="hover:text-blue-300 flex items-center gap-1">
            Customers <ChevronDown size={16} />
          </Link>
          <Link href="#" className="hover:text-blue-300 flex items-center gap-1">
            Support <ChevronDown size={16} />
          </Link>
          <Link href="#" className="hover:text-blue-300 flex items-center gap-1">
            Partners <ChevronDown size={16} />
          </Link>
          <Link href="#" className="hover:text-blue-300 flex items-center gap-1">
            Company <ChevronDown size={16} />
          </Link>
        </nav>
        
        {/* Right side utilities */}
        <div className="hidden lg:flex items-center space-x-4 2xl:space-x-6">
          <button className="p-1.5 sm:p-2 hover:bg-blue-800 rounded-full">
            <Search size={18} className="text-white" />
          </button>
          <button className="p-1.5 sm:p-2 hover:bg-blue-800 rounded-full">
            <Globe size={18} className="text-white" />
          </button>
          <button className="text-white hover:text-blue-300 font-medium text-xs sm:text-sm 2xl:text-base">
            Sign In
          </button>
          <button className=" bg-blue-400 hover:bg-blue-300 px-5 sm:px-6 py-2 2xl:px-7 2xl:py-2.5 rounded-md font-medium transition-colors text-sm 2xl:text-base">
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
        <div className="lg:hidden bg-blue-800 px-4 pb-4 space-y-2">
          <a href="/services" className="block py-2">Services</a>
          <a href="#" className="block py-2">Industries</a>
          <a href="#" className="block py-2">Learning</a>
          <a href="#" className="block py-2">Support</a>
          <a href="#" className="block py-2">Partners</a>
          <a href="#" className="block py-2">Company</a>
          <button className="w-full mt-3 bg-blue-400 px-6 py-2 rounded-md hover:bg-blue-300">
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}
