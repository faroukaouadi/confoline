"use client";

import Link from "next/link";
import Image from "next/image";
import { usePartners } from "../../hooks/usePartners";

export default function PartnersPage() {
  const { data: partners = [], isLoading: loading, error } = usePartners();

  return (
    <main className="bg-gradient-to-br from-blue-950 to-blue-900 text-white min-h-screen">
      <section className="max-w-[90%] mx-auto px-4 pt-8 pb-6 2xl:pt-12 2xl:pb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl sm:text-4xl 2xl:text-5xl font-extrabold">Partners</h1>
            <p className="mt-2 text-sm sm:text-base 2xl:text-2xl text-blue-200 max-w-2xl lg:max-w-none">
              Proud to collaborate with industry-leading partners driving innovation and value.
            </p>
          </div>
          <div className="hidden sm:block ">
            <Link
              href="#learn-more"
              className="inline-block rounded-full bg-blue-400 px-4 py-2 text-sm 2xl:text-xl font-medium text-white hover:bg-blue-300"
            >
              Read More
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-[90%] mx-auto px-4 pb-10 2xl:pb-14">
        <div className="rounded-xl bg-white shadow-sm border border-white/10 p-4 sm:p-6 2xl:p-8">
          {loading && (
            <div className="text-center text-blue-900">Loading partners...</div>
          )}
          {error && (
            <div className="text-center text-red-600">{error?.message || "Error loading partners"}</div>
          )}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 2xl:gap-14">
              {partners.map((p) => (
                 <div key={p.name} className="flex items-center justify-center ">
                 <Link href={p.link} target="_blank" rel="noopener noreferrer" className="block">
                     <Image
                     src={p.src}
                     alt={p.name}
                     unoptimized
                     width={0}   // obligatoire de mettre quelque chose
                     height={0} 
                     className="w-52"
                   />
                 </Link>
               </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-xs sm:text-sm 2xl:text-xl text-blue-200">
          Watch today’s vision demo. Our Next generation of Presales Architect.{' '}
          <Link href="#" className="underline hover:text-white">
            Watch.
          </Link>
        </div>
      </section>
    </main>
  );
}


