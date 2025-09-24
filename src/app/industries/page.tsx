import Link from "next/link";

const INDUSTRIES: Array<{ label: string; href?: string; active?: boolean }> = [
  { label: "Financial Institutions & Banking" },
  { label: "Healthcare & Life Sciences" },
  { label: "Retail & Distribution" },
  { label: "Insurance" },
  { label: "Manufacturing & Industry" },
  { label: "E-Commerce" },
  { label: "Energy & Utilities" },
  { label: "Government & Public Sector" },
  { label: "Technology & Software" },
  { label: "Telecommunications" },
  { label: "Education" },
];

export default function IndustriesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white">
      <div className="max-w-7xl 2xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-4xl 2xl:text-5xl font-semibold tracking-tight">Industries</h1>
            <p className="mt-1 text-blue-200 max-w-3xl text-sm sm:text-base 2xl:text-2xl">
              Confoline help you solve the complex business challenges unique to your industry.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="#learn-more"
              className="inline-flex items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-500/10 px-4 py-2 text-sm 2xl:text-xl font-medium text-cyan-200 hover:bg-cyan-500/20"
            >
              Learn more
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 h-px w-full bg-white/10" />

        {/* Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((item) => (
            <div
              key={item.label}
              className={
                "rounded-md border border-white/15 bg-white/5 px-4 py-3 text-sm 2xl:text-2xl font-semibold text-blue-100 " +
                (item.active
                  ? "ring-2 ring-cyan-400/60 bg-cyan-500/10"
                  : "hover:bg-white/10")
              }
            >
              <div className="flex items-center gap-2">
                <span className="text-cyan-300">•</span>
                <span>{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-10 text-center text-xs sm:text-sm 2xl:text-xl text-blue-200">
          <span>
            Watch today’s vision demo. Our Next generation of Presales Architect.
          </span>{" "}
          <Link href="#watch" className="text-cyan-300 hover:underline">
            Watch.
          </Link>
        </div>
      </div>
    </main>
  );
}


