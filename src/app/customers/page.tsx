import Link from "next/link";
import Image from "next/image";

const CUSTOMER_LOGO_DATA = [
  { name: "Ooredoo Group", logo: "/images/Customers/ooredoo.svg" },
  { name: "MTN Group", logo: "/images/Customers/mtn.svg" },
  { name: "Carrefour", logo: "/images/Customers/carrefour.svg" },
  { name: "Vodafone Group", logo: "/images/Customers/vodafone.svg" },
  { name: "Zitouna Bank", logo: "/images/Customers/zitouna.svg" },
  { name: "Micron", logo: "/images/Customers/micron.svg" },
  { name: "Djezzy", logo: "/images/Customers/djezzy.svg" },
  { name: "Baobab Group", logo: "/images/Customers/baobab.svg" },
];

export default function CustomersPage() {
  return (
    <main className="min-h-screen bg-[#162456] text-white">
      <div className="relative max-w-7xl 2xl:max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-4xl 2xl:text-5xl font-semibold tracking-tight">Customers</h1>
            <p className="mt-1 text-blue-200 max-w-3xl lg:max-w-none text-sm sm:text-base 2xl:text-2xl">
              Confoline help you solve the complex business challenges unique to your industry.
            </p>
          </div>
          <div className="shrink-0">
            <Link
              href="#learn-more"
               className="inline-block rounded-full bg-blue-400 px-4 py-2 text-sm 2xl:text-xl font-medium text-white hover:bg-blue-300"
            >
              Read More
            </Link>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 h-px w-full bg-white/10" />

        {/* Content row: logos grid + right image (desktop) */}
        <div className="mt-6 lg:flex lg:items-start lg:gap-8">
          {/* Customer Logos Grid */}
          <div className="flex-1 grid grid-cols-2 gap-4 ">
            {CUSTOMER_LOGO_DATA.map((customer, idx) => (
              <div
                key={idx}
                className="rounded-xl border gap-2 border-[#51A2FF]  p-2 hover:bg-white/10 transition-colors flex items-center min-h-[80px]"
              >
                <Image
                  src={customer.logo}
                  alt={customer.name}
                  width={120}
                  height={60}
                  className="max-w-full max-h-full object-contain"
                />
                <p>{customer.name}</p>
              </div>
            ))}
          </div>

          {/* Decorative image on the right (desktop only) */}
          <div className="hidden lg:flex lg:flex-1 items-center justify-center my-auto">
            <Image
              src={"/images/Customers/services-confoline.png"}
              alt="Decorative media wall"
              width={0}
              height={0}
              unoptimized
              priority
              className="w-full h-full object-cover "
            />
          </div>
        </div>

        {/* View All Button
        <div className="mt-8 flex justify-center">
          <Link
            href="#view-all"
            className="inline-flex items-center justify-center rounded-full bg-[#4A90E2] hover:bg-blue-600 px-6 py-3 text-sm 2xl:text-xl font-medium text-white transition-colors"
          >
            View All
          </Link>
        </div> */}
      </div>
    </main>
  );
}


