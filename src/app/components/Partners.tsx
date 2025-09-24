"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export const partnersData = [
  { name: "opentext", src: "/images/opentext.png", link: 'https://www.opentext.com/' },
  { name: "newrelic", src: "/images/newrelic.png", link: 'https://newrelic.com/' },
  { name: "elastic", src: "/images/elastic.png", link: 'https://www.elastic.co/' },
  { name: "tricentis", src: "/images/tricentis.png", link: 'https://www.tricentis.com/' },
  { name: "zabbix", src: "/images/Zabbix.png", link: 'https://www.zabbix.com/'},
  { name: "gitLab", src: "/images/GitLab.png", link: 'https://about.gitlab.com/'},
  { name: "splunk", src: "/images/Splunk.png", link: 'https://www.splunk.com/'},
  { name: "keysight", src: "/images/Keysight.png", link: 'https://www.keysight.com/'},
  { name: "ibm", src: "/images/ibm.png", link: 'https://www.ibm.com/' },
];

export default function Partners() {

  const autoplay = useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [autoplay.current]);

  return (
    <section className="bg-white">
      <div className="max-w-7xl 2xl:max-w-[90%] mx-auto px-4 py-10 2xl:py-14">
        <h2 className=" text-black text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-bold text-center mb-8">Our partners</h2>

        <div className="relative overflow-hidden" ref={emblaRef}>
          <div className="flex items-center pb-8 gap-x-10 2xl:gap-x-14">
            {partnersData.map((p) => (
              <div
                key={p.name}
                className="flex-[0_0_50%] sm:flex-[0_0_33.333%] lg:flex-[0_0_25%] xl:flex-[0_0_16.6667%] flex items-center justify-center h-16 2xl:h-20"
              >
                <Link href={p.link} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={p.src}
                    alt={p.name}
                    width={130}
                    height={40}
                    className="object-contain 2xl:w-45"
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


