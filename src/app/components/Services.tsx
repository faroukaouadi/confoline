"use client";

import { Database, Cloud, Shield, Server, Network, Boxes, Gauge, Globe, Cpu, Wallet } from "lucide-react";

type ServiceItem = {
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
};

const items: ServiceItem[] = [
  { label: "Transaction 360", Icon: Gauge },
  { label: "Catalog & scorecards", Icon: Boxes },
  { label: "Security", Icon: Shield },
  { label: "Cloud Cost Mgmt", Icon: Wallet },
  { label: "Integrations", Icon: Globe },
  { label: "Database monitoring", Icon: Database },
  { label: "Serverless", Icon: Cpu },
  { label: "Host monitoring", Icon: Server },
  { label: "Cloud monitoring", Icon: Cloud },
  { label: "Network monitoring", Icon: Network },
  { label: "Cloud monitoring", Icon: Cloud },
  { label: "Kubernetes", Icon: Boxes },
  { label: "Cloud monitoring", Icon: Cloud },
  { label: "Network monitoring", Icon: Network },
];

function Hex({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-28 h-28 2xl:w-42 2xl:h-42">
      <svg viewBox="0 0 100 100" className="absolute inset-0 text-blue-300/30">
        <polygon
          points="50,3 95,26 95,74 50,97 5,74 5,26"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-5xl 2xl:max-w-[80%] mx-auto px-4 2xl:py-2">
        <div className="rounded-3xl bg-gradient-to-br from-blue-950 to-blue-900 p-8 md:p-12 2xl:p-14 shadow-2xl border border-blue-800/40">
          <div className="text-center mb-8">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-bold">Monitor your entire stack.</h2>
            <div className="mx-auto h-1 w-24 bg-cyan-400 rounded mt-3" />
          </div>

          {/* Responsive grid: 2 per row on mobile/tablet, pyramid on desktop */}
          <div className="space-y-3">
            {/* Mobile/Tablet: 2 per row */}
            <div className="grid grid-cols-2 gap-4 md:hidden">
              {items.map(({ label, Icon }, idx) => (
                <div key={`mobile-${label}-${idx}`} className="flex flex-col items-center text-center gap-2 transition-transform duration-200 ease-out hover:scale-105">
                  <Hex>
                    <Icon size={24} className="text-cyan-300 2xl:size-8" />
                  </Hex>
                  <span className="text-xs 2xl:text-sm text-blue-100 leading-snug max-w-[8rem]">{label}</span>
                </div>
              ))}
            </div>

            {/* Desktop: Pyramid layout */}
            <div className="hidden md:block space-y-3">
              {/* Row 1: 6 items */}
              <div className="flex justify-center gap-3 2xl:gap-4">
                {items.slice(0, 6).map(({ label, Icon }, idx) => (
                  <div key={`r1-${label}-${idx}`} className="flex flex-col items-center text-center gap-2 transition-transform duration-200 ease-out hover:scale-105">
                    <Hex>
                      <Icon size={24} className="text-cyan-300 2xl:size-8" />
                    </Hex>
                    <span className="text-xs 2xl:text-sm text-blue-100 leading-snug max-w-[8rem]">{label}</span>
                  </div>
                ))}
              </div>

              {/* Row 2: 5 items */}
              <div className="flex justify-center gap-3 2xl:gap-4">
                {items.slice(6, 11).map(({ label, Icon }, idx) => (
                  <div key={`r2-${label}-${idx}`} className="flex flex-col items-center text-center gap-2 transition-transform duration-200 ease-out hover:scale-105">
                    <Hex>
                      <Icon size={24} className="text-cyan-300 2xl:size-8" />
                    </Hex>
                    <span className="text-xs 2xl:text-sm text-blue-100 leading-snug max-w-[8rem]">{label}</span>
                  </div>
                ))}
              </div>

              {/* Optional remaining items, still centered if provided */}
              {items.length > 11 && (
                <div className="flex justify-center gap-3 2xl:gap-4">
                  {items.slice(11).map(({ label, Icon }, idx) => (
                    <div key={`r3-${label}-${idx}`} className="flex flex-col items-center text-center gap-2 transition-transform duration-200 ease-out hover:scale-105">
                      <Hex>
                        <Icon size={24} className="text-cyan-300 2xl:size-8" />
                      </Hex>
                      <span className="text-xs 2xl:text-sm text-blue-100 leading-snug max-w-[8rem]">{label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button className="px-5 py-2 2xl:px-6 2xl:py-3 rounded-md text-cyan-200 border border-cyan-300/60 hover:bg-cyan-300/10 transition-colors text-sm 2xl:text-base">
              Explore the platform
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


