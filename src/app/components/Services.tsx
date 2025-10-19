"use client";

import { Cloud, Shield, Server, Network, Boxes, Gauge, Globe, Cpu } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

type ServiceItem = {
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }> | string;
  description: string;
};

const items: ServiceItem[] = [
  { 
    label: "Transaction 360", 
    Icon: Gauge,
    description: "We provide a comprehensive, end-to-end view of transactions using advanced monitoring and analytics solutions from our partners, including AppDynamics, Elastic Search APM, and New Relic. This approach enables businesses to track performance, detect issues in real time, and optimize the entire transaction lifecycle for better efficiency and customer experience."
  },
  { 
    label: "Catalog & scorecards", 
    Icon: Boxes,
    description: "We offer catalog and scorecards capabilities through our partners, including IBM, New Relic, and AppDynamics, enabling businesses to track performance, measure success, and make data-driven decisions effectively."
  },
  { 
    label: "Security", 
    Icon: Shield,
    description: "We deliver robust security solutions through our partnerships with OpenText, Sonatype, and SonarQube, helping businesses protect their applications, manage risks, and ensure compliance across the software lifecycle."
  },
  { 
    label: "Cloud Cost Mgmt", 
    Icon: Globe,
    description: "Advanced cloud cost optimization solutions that provide real-time visibility into your cloud spending. We help identify unused resources, right-size instances, and implement cost-saving strategies to reduce your cloud bills while maintaining performance and reliability."
  },
  { 
    label: "Integrations", 
    Icon: Boxes,
    description: "We provide a range of connectors that enable seamless integration of your observability with multiple third-party tools."
  },
  { 
    label: "Serverless", 
    Icon: Cpu,
    description: "We provide serverless monitoring solutions through our partners, including IBM, OpenText, New Relic, ELK, and BMC, ensuring your serverless applications run reliably, efficiently, and at peak performance."
  },
  { 
    label: "Host monitoring", 
    Icon: Server,
    description: "We offer comprehensive host monitoring capabilities using solutions from our partners, including IBM, OpenText, New Relic, ELK, BMC, and Zabbix, ensuring optimal performance, availability, and reliability of your IT infrastructure."
  },
  { 
    label: "Cloud Monitoring", 
    Icon: Cloud,
    description: "We deliver cloud monitoring solutions through our partners, including IBM, OpenText, New Relic, ELK, and BMC, ensuring your cloud infrastructure is secure, reliable, and performing optimally."
  },
  { 
    label: "Network monitoring", 
    Icon: Network,
    description: "We deliver comprehensive network monitoring solutions through our partners, including IBM, OpenText, New Relic, ELK, BMC, and Zabbix, ensuring your network remains reliable, secure, and high-performing."
  },
  { 
    label: "Kubernetes", 
    Icon: Boxes,
    description: "We provide Kubernetes monitoring solutions through our partners, including IBM, OpenText, New Relic, and OpenTelemetry, ensuring your containerized applications run efficiently, reliably, and at scale."
  },
  { 
    label: "User Experience", 
    Icon: "/images/UserExperience.svg",
    description: "We provide user experience solutions through our partners, including IBM, New Relic, ELK, and AppDynamics, enabling businesses to monitor, analyze, and optimize applications for seamless and efficient customer interactions."
  },
  { 
    label: "DevOps", 
    Icon: "/images/DevOps.svg",
    description: "We provide comprehensive DevOps solutions through our partners, including IBM, OpenText, Tricentis, and more, helping organizations streamline development, testing, and deployment for faster, more reliable software delivery."
  },
  { 
    label: "Hybrid Observability", 
    Icon: "/images/HybridObservability.svg",
    description: "We provide sophisticated hybrid observability solutions through our partners, including IBM, OpenText, HPE, New Relic, ELK, and more, enabling organizations to monitor, analyze, and optimize complex IT environments seamlessly."
  },
  { 
    label: "Log Management & Tracing", 
    Icon: "/images/LogManagement-Tracing.svg",
    description: "We deliver advanced log management and tracing capabilities through our partners, including Splunk, ELK, OpenText, and New Relic, enabling organizations to gain deep operational insights, ensure system reliability, and optimize performance across complex IT environments."
  },
];

function Hex({ children, label, onClick }: { 
  children: React.ReactNode; 
  label: string; 
  onClick: () => void;
}) {
  return (
    <div 
      className="relative group cursor-pointer w-30 h-32 lg:w-40 lg:h-42 2xl:w-60 2xl:h-62"
      onClick={onClick}
    >
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
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const handleServiceClick = (service: ServiceItem) => {
    setSelectedService(service);
  };

  const handleClosePopup = () => {
    setSelectedService(null);
  };

  // Helper function to render icon
  const renderIcon = (Icon: React.ComponentType<{ size?: number; className?: string }> | string, size: number, className: string) => {
    if (typeof Icon === 'string') {
      return (
        <Image
          src={Icon}
          alt="Service icon"
          width={size}
          height={size}
          className={className}
        />
      );
    } else {
      const IconComponent = Icon;
      return <IconComponent size={size} className={className} />;
    }
  };

  return (
    <>
    <section className="py-16" style={{ background: 'linear-gradient(180deg, #0C1B46 0%, #0065A1 30.76%, #0C1B46 100%)' }}>
      <div className="w-full px-8">
        <div>
          <div className="text-center mb-12">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-bold"> We help you find the right solution that meets your <br />unique requirements and constraints.</h2>
            
          </div>

          {/* Responsive grid: 2 per row on mobile/tablet, pyramid on desktop */}
          <div className="space-y-3">
            {/* Mobile/Tablet: 2 per row */}
            <div className="grid grid-cols-2 place-items-center md:hidden">
              {items.map((item, idx) => (
                <div key={`mobile-${item.label}-${idx}`} className="transition-transform duration-200 ease-out hover:scale-105">
                  <Hex 
                    label={item.label}
                    onClick={() => handleServiceClick(item)}
                  >
                    {renderIcon(item.Icon, 18, "text-[#E5E7EB] lg:size-6 2xl:size-8")}
                  </Hex>
                </div>
              ))}
            </div>

            {/* Desktop: Pyramid layout */}
            <div className="hidden md:block 2xl:space-y-4">
              {/* Row 1: 6 items */}
              <div className="flex justify-center gap-6">
                {items.slice(0, 6).map((item, idx) => (
                  <div key={`r1-${item.label}-${idx}`} className="transition-transform duration-200 ease-out hover:scale-105">
                    <Hex 
                      label={item.label}
                      onClick={() => handleServiceClick(item)}
                    >
                      {renderIcon(item.Icon, 32, "text-[#E5E7EB] 2xl:size-10")}
                    </Hex>
                  </div>
                ))}
              </div>

              {/* Row 2: 5 items */}
              <div className="flex justify-center gap-6">
                {items.slice(6, 11).map((item, idx) => (
                  <div key={`r2-${item.label}-${idx}`} className="transition-transform duration-200 ease-out hover:scale-105">
                    <Hex 
                      label={item.label}
                      onClick={() => handleServiceClick(item)}
                    >
                      {renderIcon(item.Icon, 32, "text-[#E5E7EB] 2xl:size-10")}
                    </Hex>
                  </div>
                ))}
              </div>

              {/* Row 3: 3 items */}
              <div className="flex justify-center gap-6">
                {items.slice(11, 14).map((item, idx) => (
                  <div key={`r3-${item.label}-${idx}`} className="transition-transform duration-200 ease-out hover:scale-105">
                    <Hex 
                      label={item.label}
                      onClick={() => handleServiceClick(item)}
                    >
                      {renderIcon(item.Icon, 32, "text-[#E5E7EB] 2xl:size-10")}
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
    <div className="h-20 2xl:h-40 bg-gradient-to-b from-blue-950 to-blue-900"></div>

    {/* Service Description Popup */}
    {selectedService && (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={handleClosePopup}
      >
        <div 
          className="relative max-w-2xl mx-4 bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl border border-white/20 shadow-2xl transform transition-all duration-300 ease-out animate-in fade-in-0 zoom-in-95"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={handleClosePopup}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Content */}
          <div className="p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                {renderIcon(selectedService.Icon, 24, "text-white")}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl 2xl:text-3xl font-bold text-white mb-2">
                  {selectedService.label}
                </h3>
              </div>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-blue-100 text-lg 2xl:text-xl leading-relaxed">
                {selectedService.description}
              </p>
            </div>
            
            {/* Action buttons */}
            <div className="mt-8 flex gap-4 justify-end">
              <button
                onClick={handleClosePopup}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
    
  );
}


