"use client";

import { MessageSquareText, Laptop2 } from "lucide-react";
import { useState } from "react";
import ContactPopup from "./ContactPopup";

export default function FloatingButtons() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  

  return (
    <div className="fixed right-3 sm:right-4 top-9/12 -translate-y-1/2 z-40 flex flex-col gap-2 sm:gap-3">
      <a
        href="#contact"
        className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full border-2 sm:border-4 border-white/70 bg-cyan-400 px-3.5 py-2.5 sm:px-5 sm:py-3 text-blue-950 text-sm sm:text-base shadow-xl transition-transform hover:scale-105 focus-visible:scale-105"
        onClick={(e) => {
          e.preventDefault();
          setIsContactOpen(true);
        }}
      >
        <MessageSquareText className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="font-semibold">Contact</span>
      </a>
      <a
        href="#demo"
        className="group inline-flex items-center gap-1.5 sm:gap-2 rounded-full border-2 sm:border-4 border-white/70 bg-cyan-400 px-3.5 py-2.5 sm:px-5 sm:py-3 text-blue-950 text-sm sm:text-base shadow-xl transition-transform hover:scale-105 focus-visible:scale-105"
      >
        <Laptop2 className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className="font-semibold">Demo</span>
      </a>

      <ContactPopup open={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}


