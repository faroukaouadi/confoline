"use client";

import Link from "next/link";
import { useState } from "react";

const INDUSTRIES: Array<{ 
  label: string; 
  description: string; 
  href?: string; 
  active?: boolean 
}> = [
  { 
    label: "Financial Institutions & Banking",
    description: " We empower financial organizations with secure, scalable, and compliant IT solutions that enhance customer trust, improve efficiency, and drive digital transformation."
  },
  { 
    label: "Healthcare & Life Sciences",
    description: "We support healthcare and life sciences organizations with secure, reliable IT solutions that improve patient care, enhance research, and drive operational efficiency."
  },
  { 
    label: "Retail & Distribution",
    description: "We help retail and distribution businesses optimize operations, enhance customer experiences, and drive growth through smart, technology-driven solutions."
  },
  { 
    label: "Insurance",
    description: "We enable insurance companies to improve efficiency, enhance customer service, and accelerate digital transformation with secure and innovative IT solutions."
  },
  { 
    label: "Manufacturing & Industry",
    description: "We support manufacturing and industrial businesses with advanced IT solutions that boost productivity, streamline operations, and drive innovation across the production lifecycle."
  },
  { 
    label: "E-Commerce",
    description: "We help e-commerce businesses streamline operations, enhance customer experiences, and drive growth through reliable technology and efficient digital solutions."
  },
  { 
    label: "Energy & Utilities",
    description: "We help energy and utility companies enhance efficiency, ensure reliability, and drive sustainability through innovative and secure technology solutions."
  },
  { 
    label: "Government & Public Sector",
    description: "We support government and public sector organizations with secure, efficient, and scalable IT solutions that enhance service delivery and drive digital transformation."
  },
  { 
    label: "Technology & Software",
    description: "We empower technology and software companies with scalable IT solutions that enhance innovation, improve performance, and accelerate digital growth."
  },
  { 
    label: "Telecommunications",
    description: "We help telecommunications companies strengthen connectivity, enhance customer experiences, and drive innovation through reliable and scalable IT solutions."
  },
  { 
    label: "Education",
    description: "We support educational institutions with technology solutions that enhance learning, streamline operations, and enable digital transformation."
  },
];

export default function IndustriesPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const handleIndustryClick = (label: string) => {
    setSelectedIndustry(selectedIndustry === label ? null : label);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white">
      <div className="max-w-7xl 2xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-4xl 2xl:text-5xl font-semibold tracking-tight">Industries</h1>
            <p className="mt-1 text-blue-200 max-w-3xl lg:max-w-none text-sm sm:text-base 2xl:text-2xl">
              Confoline help you solve the complex business challenges unique to your industry.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="#learn-more"
              className="inline-block rounded-full bg-blue-400 px-4 py-2 text-sm 2xl:text-xl font-medium text-white hover:bg-blue-300"
            >
              Read More
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 h-px w-full bg-white/10" />

        {/* Grid with independent columns */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            {INDUSTRIES.filter((_, index) => index % 3 === 0).map((item) => (
              <div key={item.label}>
                <div
                  onClick={() => handleIndustryClick(item.label)}
                  className={
                    "rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm 2xl:text-2xl font-semibold text-blue-100 cursor-pointer transition-all duration-200 " +
                    (selectedIndustry === item.label
                      ? "ring-2 ring-cyan-400/60 bg-cyan-500/10"
                      : "hover:bg-white/10")
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-300">•</span>
                      <span>{item.label}</span>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-cyan-300 transition-transform duration-200 ${
                        selectedIndustry === item.label ? 'rotate-180' : ''
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* Accordion Content */}
                {selectedIndustry === item.label && (
                  <div className="mt-4 p-6 bg-white/5  rounded-lg border border-white/20 shadow-lg animate-in fade-in-0 slide-in-from-top-2 duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-3 h-3 bg-cyan-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <h3 className="text-xl 2xl:text-2xl font-bold text-white mb-3">
                          {item.label}
                        </h3>
                        <p className="text-blue-100 text-base 2xl:text-lg leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            {INDUSTRIES.filter((_, index) => index % 3 === 1).map((item) => (
              <div key={item.label}>
                <div
                  onClick={() => handleIndustryClick(item.label)}
                  className={
                    "rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm 2xl:text-2xl font-semibold text-blue-100 cursor-pointer transition-all duration-200 " +
                    (selectedIndustry === item.label
                      ? "ring-2 ring-cyan-400/60 bg-cyan-500/10"
                      : "hover:bg-white/10")
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-300">•</span>
                      <span>{item.label}</span>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-cyan-300 transition-transform duration-200 ${
                        selectedIndustry === item.label ? 'rotate-180' : ''
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* Accordion Content */}
                {selectedIndustry === item.label && (
                  <div className="mt-4 p-6 bg-white/5 rounded-lg border border-white/20 shadow-lg animate-in fade-in-0 slide-in-from-top-2 duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-3 h-3 bg-cyan-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <h3 className="text-xl 2xl:text-2xl font-bold text-white mb-3">
                          {item.label}
                        </h3>
                        <p className="text-blue-100 text-base 2xl:text-lg leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            {INDUSTRIES.filter((_, index) => index % 3 === 2).map((item) => (
              <div key={item.label}>
                <div
                  onClick={() => handleIndustryClick(item.label)}
                  className={
                    "rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm 2xl:text-2xl font-semibold text-blue-100 cursor-pointer transition-all duration-200 " +
                    (selectedIndustry === item.label
                      ? "ring-2 ring-cyan-400/60 bg-cyan-500/10"
                      : "hover:bg-white/10")
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-300">•</span>
                      <span>{item.label}</span>
                    </div>
                    <svg 
                      className={`w-5 h-5 text-cyan-300 transition-transform duration-200 ${
                        selectedIndustry === item.label ? 'rotate-180' : ''
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* Accordion Content */}
                {selectedIndustry === item.label && (
                  <div className="mt-4 p-6 bg-white/5 rounded-lg border border-white/20 shadow-lg animate-in fade-in-0 slide-in-from-top-2 duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-3 h-3 bg-cyan-400 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <h3 className="text-xl 2xl:text-2xl font-bold text-white mb-3">
                          {item.label}
                        </h3>
                        <p className="text-blue-100 text-base 2xl:text-lg leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center text-xs sm:text-sm 2xl:text-xl text-blue-200">
          <span>
          Watch today’s vision demo. Our Next generation of AI-Driven Business Value Assessment.
          </span>{" "}
          <Link href="#watch" className="text-cyan-300 hover:underline">
            Watch.
          </Link>
        </div>
      </div>
    </main>
  );
}


