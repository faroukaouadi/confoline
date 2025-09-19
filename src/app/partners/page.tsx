"use client";

import Link from "next/link";
import Image from "next/image";
import { partnersData } from "../components/Partners";

export default function PartnersPage() {
  return (
    <main className="bg-gradient-to-br from-blue-950 to-blue-900 text-white min-h-screen">
      <section className="max-w-7xl 2xl:max-w-[90%] mx-auto px-4 pt-8 pb-6 2xl:pt-12 2xl:pb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl sm:text-4xl 2xl:text-5xl font-extrabold">Partners</h1>
            <p className="mt-2 text-sm sm:text-base 2xl:text-2xl text-blue-200 max-w-2xl">
              Proud to collaborate with industry-leading partners driving innovation and value.
            </p>
          </div>
          <div className="hidden sm:block">
            <Link
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-sm 2xl:text-xl"
            >
              Learn more
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl 2xl:max-w-[90%] mx-auto px-4 pb-10 2xl:pb-14">
        <div className="rounded-xl bg-white shadow-sm border border-white/10 p-4 sm:p-6 2xl:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 2xl:gap-12">
            {partnersData.map((p) => (
              <div key={p.name} className="flex items-center justify-center">
                <Link href={p.link} target="_blank" rel="noopener noreferrer" className="block">
                  <Image
                    src={p.src}
                    alt={p.name}
                    width={200}
                    height={64}
                    className="object-contain 2xl:w-55"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-xs sm:text-sm 2xl:text-xl text-blue-200">
          Watch today’s vision demo. Our Next generation of presales architect.{' '}
          <Link href="#" className="underline hover:text-white">
            Watch.
          </Link>
        </div>
      </section>
    </main>
  );
}


