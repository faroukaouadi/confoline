"use client";

import Image from "next/image";
import Link from "next/link";

export const partnersData = [
  { name: "opentext", src: "/images/opentext.png", link: 'https://www.opentext.com/' },
  { name: "ser", src: "/images/SER.png", link: 'https://www.sergroup.com/' },
  { name: "newrelic", src: "/images/newrelic.png", link: 'https://newrelic.com/' },
  { name: "elastic", src: "/images/elastic.png", link: 'https://www.elastic.co/' },
  { name: "ibm", src: "/images/ibm.png", link: 'https://www.ibm.com/' },
  { name: "tricentis", src: "/images/tricentis.png", link: 'https://www.tricentis.com/' },
  { name: "opsramp", src: "/images/OpsRamp.png", link: 'https://www.opsramp.com/' },
];

export default function Partners() {

  return (
    <section className="bg-white">
      <div className="max-w-7xl 2xl:max-w-[90%] mx-auto px-4 py-10 2xl:py-14">
        <h2 className="text-2xl text-black sm:text-3xl 2xl:text-4xl font-bold text-center mb-8">Our partners</h2>

        <div className="relative">
          <div className="flex flex-wrap items-center justify-center gap-x-10 2xl:gap-x-14 gap-y-6 pb-8 border-b border-gray-200">
            {partnersData.map((p) => (
              <div key={p.name} className="flex items-center justify-center h-16 2xl:h-20">
                <Link href={p.link} target="_blank" rel="noopener noreferrer">
                <Image
                  src={p.src}
                  alt={p.name}
                  width= {130}
                  height={40}
                  className="object-contain"
                />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


