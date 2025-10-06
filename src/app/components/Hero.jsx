"use client";

import { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import HeroCarousel from "./HeroCarousel";
import DemoPopup from "./DemoPopup";




export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  // Tableau des textes pour le carrousel
  const textSlides = [
    {
      titlepart1: "AI-POWERED INSIGHTS ",
      titlepart2: "FOR YOUR BUSINESS STRATEGY.",
      description: "By integrating AI, data, and workflows across your organization powered by solutions from diverse software providers we equip you to refine and execute your strategic vision."
    },
    {

      titlepart1: "TRANSFORM YOUR BUSINESS PROCESS",
      titlepart2: "TODAY",
      description: "Streamline operations, boost productivity, and leverage intelligent automation and AI-powered solutions adapted to your unique needs."
    },
    // {
    //   titlepart1: "ACCELERATE INNOVATION",
    //   titlepart2: "NOW",
    //   description: "Leverage cutting-edge technology to drive digital transformation and stay ahead of the competition in today's market."
    // },
    {
      titlepart1: "EMPOWER YOUR TEAMS  ",
      titlepart2: "WITH EXPERT INSIGHT",
      description: "Empower your teams with expert insight, providing the tools they need to work smarter, faster, and more efficiently across all departments."
    }
  ];

  // Auto-play pour le carrousel de texte
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % textSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, textSlides.length]);

  const nextTextSlide = () => {
    setCurrentTextIndex((prev) => (prev + 1) % textSlides.length);
  };

  const prevTextSlide = () => {
    setCurrentTextIndex((prev) => (prev - 1 + textSlides.length) % textSlides.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="text-white">
      <div className=" max-w-[90%] mx-auto px-4 pt-16 2xl:py-20">
        <div className="space-y-4">

          {/* Section Texte avec Carrousel */}
          <div>
            {/* Carrousel de Texte */}
            <div className="relative">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentTextIndex * 100}%)` }}
                >
                  {textSlides.map((slide, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <div className="grid lg:grid-cols-2 gap-8 items-center">
                        {/* Titre à gauche */}
                        <div>
                          <h1 className="text-3xl sm:text-4xl lg:text-[3rem] 2xl:text-[4rem] font-bold leading-tight">
                            <span className="text-blue-300">{slide.titlepart1}</span>
                            <br />
                            <span className="text-white">{slide.titlepart2}</span>
                          </h1>
                        </div>

                        {/* Description à droite */}
                        <div>
                          <p className="text-lg sm:text-xl 2xl:text-[2rem] text-gray-200 leading-relaxed">
                            {slide.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contrôles du carrousel de texte */}
              <div className="flex flex-col sm:flex-row items-center justify-between mt-8 2xl:mt-10 gap-4">
                <div className="flex items-center space-x-4">
                  {/* Indicateurs */}
                  <div className="flex space-x-2">
                    {textSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTextIndex(index)}
                        className={`w-3 h-3 2xl:w-5 2xl:h-5 rounded-full transition-colors ${index === currentTextIndex
                            ? 'bg-blue-400'
                            : 'bg-white/30 hover:bg-white/50'
                          }`}
                      />
                    ))}
                  </div>

                  {/* Bouton Play/Pause */}
                  <button
                    onClick={togglePlayPause}
                    className="p-2 hover:bg-blue-800 rounded-full transition-colors"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                </div>

                {/* Actions à droite */}
                <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 2xl:gap-5">
                  <button className="  border-2 border-cyan-300/60 text-white hover:bg-cyan-300/10 hover:text-white cursor-pointer px-5 sm:px-8 py-2.5 sm:py-3 2xl:px-10 2xl:py-4 rounded-full font-medium transition-colors text-sm 2xl:text-[24px] w-[180] h-[56]  2xl:h-18 sm:w-auto"
                  onClick={()=> window.open("https://vision.confoline.com", "_blank", "noopener,noreferrer")}>
                    Explore AI Agents
                  </button>
                  <button className="bg-[#51A2FF] hover:bg-blue-300 text-white px-5 sm:px-8 py-2.5 sm:py-3 2xl:px-10 2xl:py-4 rounded-full font-medium transition-colors cursor-pointer text-sm 2xl:text-[24px]  w-[180] h-[56] 2xl:h-18 sm:w-auto"
                  onClick={(e)=>{
                    e.preventDefault();
                    setIsDemoOpen(true);
                  }}>
                    Schedule Demo
                  </button>
                  <DemoPopup open={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
                </div>
              </div>
            </div>

            {/* Boutons d'action */}

          </div>          
        </div>
      </div>
      <HeroCarousel />
    </div>
  );
}
