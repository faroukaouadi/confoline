import Link from "next/link";
import Image from "next/image";

const PLACEHOLDERS = new Array(8).fill("Add body text");

export default function CustomersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white">
      <div className="relative max-w-7xl 2xl:max-w-[90%] mx-auto  px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl 2xl:text-4xl sm:text-3xl font-semibold tracking-tight">Customers</h1>
            <p className="mt-1 text-blue-200 max-w-3xl text-sm  sm:text-base 2xl:text-lg">
              Confoline help you solve the complex business challenges unique to your industry.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="#learn-more"
              className="inline-flex items-center justify-center rounded-md border border-cyan-300/40 bg-cyan-500/10 px-4 py-2 text-sm 2xl:text-lg font-medium text-cyan-200 hover:bg-cyan-500/20"
            >
              Learn more
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 h-px w-full bg-white/10" />

        {/* Content row: grid + right image (desktop) */}
        <div className="mt-6 lg:flex lg:items-start lg:gap-8">
          {/* Grid with placeholders */}
          <div className="flex-1 grid grid-cols-1 gap-4 sm:grid-cols-2 ">
            {PLACEHOLDERS.map((text, idx) => (
              <div
                key={idx}
                className={
                  "rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm 2xl:text-3xl font-semibold text-blue-100 " +
                  (idx === 1 ? "ring-2 ring-cyan-400/60 bg-cyan-500/10" : "hover:bg-white/10")
                }
              >
                <div className="flex items-center gap-2">
                  <span className="text-cyan-300">•</span>
                  <span>{text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Decorative image on the right (desktop only) */}
          <div className="hidden lg:block shrink-0 self-start">
            <Image
              src={"/images/services-confoline.png"}
              alt="Decorative media wall"
              width={560}
              height={320}
              priority
              className="2xl:w-5xl"
            />
          </div>
        </div>
      </div>
    </main>
  );
}


