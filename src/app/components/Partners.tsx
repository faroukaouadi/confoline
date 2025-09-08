"use client";

import Image from "next/image";

export default function Partners() {
  const partners = [
    { name: "opentext", src: "/images/opentext.png", width: 110 },
    { name: "ser", src: "/images/SER.png", width: 110 },
    { name: "newrelic", src: "/images/newrelic.png", width: 110 },
    { name: "elastic", src: "/images/elastic.png", width: 10 },
    { name: "ibm", src: "/images/ibm.png", width: 110 },
    { name: "tricentis", src: "/images/tricentis.png", width: 110 },
    { name: "opsramp", src: "/images/OpsRamp.png", width: 110 },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl 2xl:max-w-[90%] mx-auto px-4 py-10 2xl:py-14">
        <h2 className="text-2xl text-black sm:text-3xl 2xl:text-4xl font-bold text-center mb-8">Our partners</h2>

        <div className="relative">
          <div className="flex flex-wrap items-center justify-center gap-x-10 2xl:gap-x-14 gap-y-6 pb-8 border-b border-gray-200">
            {partners.map((p) => (
              <div key={p.name} className="flex items-center justify-center h-16 2xl:h-20">
                <Image
                  src={p.src}
                  alt={p.name}
                  width={p.width}
                  height={40}
                  className="h-12 2xl:h-14 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


