"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";


type Partner = { id: number; name: string; src: string; link: string };


export default function Partners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("http://127.0.0.1:8000/admin/confoline-Api/partners.php", {
          signal: controller.signal,
          headers: { "Accept": "application/json" },
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch partners");
        const json = await res.json();
        if (json && json.success && Array.isArray(json.data)) {
          setPartners(json.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (e: any) {
        if (e.name !== "AbortError") setError(e.message || "Error loading partners");
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, []);


  const autoplay = useRef(
    Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [autoplay.current]);

  return (
    <section className="bg-white">
      <div className="max-w-[90%] mx-auto px-4 py-10 2xl:py-14">
        <h2 className=" text-black text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-bold text-center mb-8">Our partners</h2>
        {loading && (
            <div className="text-center text-blue-900">Loading partners...</div>
          )}
            {error && (
            <div className="text-center text-red-600">{error}</div>
          )}
          {!loading && !error && (
        <div className="relative overflow-hidden" ref={emblaRef}>
          <div className="flex items-center pl-16 pb-8 gap-x-16">
            {partners.map((p) => (
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
         )}
      </div>
    </section>
  );
}


