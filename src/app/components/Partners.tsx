"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export const partnersData = [
  
  { name: "newrelic", src: "/images/partners/newrelicWHITE.svg", link: 'https://newrelic.com/' },
  { name: "zabbix", src: "/images/partners/zabbixWHITE.svg", link: 'https://www.zabbix.com/'},
  { name: "gitLab", src: "/images/partners/gitlabWHITE.svg", link: 'https://about.gitlab.com/'},
  { name: "keysight", src: "/images/partners/KeysightWHITE.svg", link: 'https://www.keysight.com/'},
  { name: "ibm", src: "/images/partners/ibmWHITE.svg", link: 'https://www.ibm.com/'},
  { name: "elastic", src: "/images/partners/elasticWHITE.svg", link: 'https://www.elastic.co/' },
  { name: "opentext", src: "/images/partners/opentextWHITE.svg", link: 'https://www.opentext.com/'},
  { name: "splunk", src: "/images/partners/splunkWHITE.svg", link: 'https://www.splunk.com/'},
  { name: "tricentis", src: "/images/partners/tricentisWHITE.svg", link: 'https://www.tricentis.com/' },
  // { name: "opsramp", src: "/images/partners/opsrampWHITE.svg", link: 'https://www.opsramp.com/' },
  // { name: "ser", src: "/images/partners/serWHITE.svg", link: 'https://www.sergroup.com/'},
];

export default function Partners() {

  const autoplay = useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [autoplay.current]);

  return (
    <section className="">
      <div className="max-w-[90%] mx-auto px-4 py-10 2xl:py-14">
        <h2 className=" text-white text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-bold text-center mb-8">
          Trusted by partners across the globe
        </h2>

        <div className="relative overflow-hidden" ref={emblaRef}>
          <div className="flex items-center pl-16 pb-8 gap-x-16 ">
            {partnersData.map((p) => (
              <div
                key={p.name}
                className="flex-[0_0_50%] sm:flex-[0_0_33.333%] lg:flex-[0_0_25%] xl:flex-[0_0_16.6667%] flex items-center justify-center  h-16 2xl:h-20"
              >
                <Link href={p.link} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={p.src}
                    alt={p.name}
                    unoptimized
                    width={0}   // obligatoire de mettre quelque chose
                    height={0} 
                    className="w-auto"
                  />
                  {/* <img src={p.src} alt={p.name} className="" /> */}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


