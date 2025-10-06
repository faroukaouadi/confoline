"use client";

import { Cloud, Shield, Server, Network, Boxes, Gauge, Globe, Cpu, Wallet } from "lucide-react";

type ServiceItem = {
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
};

const items: ServiceItem[] = [
  { label: "Transaction 360", Icon: Gauge },
  { label: "Catalog & scorecards", Icon: Boxes },
  { label: "Security", Icon: Shield },
  { label: "Transaction 360", Icon: Wallet },
  { label: "Cloud Cost Mgmt", Icon: Globe },
  { label: "Integrations", Icon: Boxes },
  { label: "Serverless", Icon: Cpu },
  { label: "Host monitoring", Icon: Server },
  { label: "Cloud monitoring", Icon: Cloud },
  { label: "Network monitoring", Icon: Network },
  { label: "Cloud monitoring", Icon: Cloud },
  { label: "Kubernetes", Icon: Boxes },
  { label: "Cloud monitoring", Icon: Cloud },
  { label: "Network monitoring", Icon: Network },
];

function Hex({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="relative group cursor-pointer w-30 h-32 lg:w-40 lg:h-42 2xl:w-60 2xl:h-62">
      <svg viewBox="0 0 100 100" className="absolute inset-0">
        {/* Outer hexagon */}
        <polygon
          points="50,3 95,26 95,74 50,97 5,74 5,26"
          fill="#162456"
          stroke="rgba(147, 197, 253, 0.2)"
          strokeWidth="1"
          className="group-hover:stroke-cyan-300 transition-colors duration-200"
        />
        {/* Inner hexagon */}
        <polygon
          points="50,12 88,32 88,68 50,88 12,68 12,32"
          fill="none"
          stroke="rgba(147, 197, 253, 0.4)"
          strokeWidth="2"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="mb-2">
          {children}
        </div>
        <span className="text-[9px] lg:text-xs 2xl:text-lg text-blue-100 leading-tight text-center px-2 max-w-[8rem]">{label}</span>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <>
    <section className="py-16" style={{ background: 'linear-gradient(180deg, #0C1B46 0%, #0065A1 30.76%, #0C1B46 100%)' }}>
      <div className="w-full px-8">
        <div>
          <div className="text-center mb-12">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-bold">Monitor your entire stack.</h2>
            
          </div>

          {/* Responsive grid: 2 per row on mobile/tablet, pyramid on desktop */}
          <div className="space-y-3">
            {/* Mobile/Tablet: 2 per row */}
            <div className="grid grid-cols-2 place-items-center md:hidden">
              {items.map(({ label, Icon }, idx) => (
                <div key={`mobile-${label}-${idx}`} className="transition-transform duration-200 ease-out hover:scale-105">
                  <Hex label={label}>
                    <Icon size={18} className="text-[#E5E7EB] lg:size-6 2xl:size-8" />
                  </Hex>
                </div>
              ))}
            </div>

            {/* Desktop: Pyramid layout */}
            <div className="hidden md:block 2xl:space-y-8">
              {/* Row 1: 6 items */}
              <div className="flex justify-center gap-6">
                {items.slice(0, 6).map(({ label, Icon }, idx) => (
                  <div key={`r1-${label}-${idx}`} className="transition-transform duration-200 ease-out hover:scale-105">
                    <Hex label={label}>
                      <Icon size={32} className="text-[#E5E7EB] 2xl:size-10" />
                    </Hex>
                  </div>
                ))}
              </div>

              {/* Row 2: 5 items */}
              <div className="flex justify-center gap-6">
                {items.slice(6, 11).map(({ label, Icon }, idx) => (
                  <div key={`r2-${label}-${idx}`} className="transition-transform duration-200 ease-out hover:scale-105">
                    <Hex label={label}>
                      <Icon size={32} className="text-[#E5E7EB] 2xl:size-10" />
                    </Hex>
                  </div>
                ))}
              </div>

              {/* Row 3: 3 items */}
              <div className="flex justify-center gap-6">
                {items.slice(11, 14).map(({ label, Icon }, idx) => (
                  <div key={`r3-${label}-${idx}`} className="transition-transform duration-200 ease-out hover:scale-105">
                    <Hex label={label}>
                      <Icon size={32} className="text-[#E5E7EB] 2xl:size-10" />
                    </Hex>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <div className="mt-12 flex justify-center">
            <button className="px-8 py-3 rounded-4xl text-white border border-cyan-300/60 hover:bg-cyan-300/10 transition-colors text-base 2xl:text-[24px] sm:w-auto h-[56] 2xl:h-18">
              Explore the platform
            </button>
          </div> */}
        </div>
      </div>
      
    </section>
    {/* <div className="h-20 2xl:h-40 bg-amber-50"></div> */}
    </>
    
  );
}


