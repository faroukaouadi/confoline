"use client";

import ServiceChatbot from "../components/ServiceChatbot";

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-blue-950 to-blue-900 text-white">
      <section className="max-w-7xl 2xl:max-w-[90%] mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl  font-bold">Services</h1>
            <p className="mt-2 max-w-3xl text-sm sm:text-base 2xl:text-2xl text-blue-200">
              Next-generation IT services combining Observability, intelligent automation, and AI to
              accelerate business outcomes.
            </p>
          </div>
          <a
            href="#details"
            className="inline-block rounded-full bg-blue-400 px-4 py-2 text-sm 2xl:text-xl font-medium text-white hover:bg-blue-300"
          >
            Learn more
          </a>
        </div>

        <hr className="mt-6 border-blue-700/60" />

        <div
          id="details"
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <ServiceCard
            title="Professional Services"
            description="Expert guidance across Observability, IT Service Management, Application Delivery Management, and Cybersecurity to help modernize processes and achieve tangible outcomes—through consulting, implementation, or ongoing support."
          />
          <ServiceCard
            title="Managed Services"
            description="Outcome-based, cost-efficient managed services for monitoring, automation, and operations. Flexible options to match your performance and cost objectives while adapting to your business needs."
          />
          <ServiceCard
            title="AI-Driven Managed Services"
            description="Combine intelligent automation with proactive AIOps to simplify complexity, cut costs, and improve reliability. We engineer and automate runbooks to deliver fewer incidents, improved time-to-resolve, and adaptive workflows aligned to your goals."
          />
          <ServiceCard
            title="Business Value Assessment"
            description="Identify opportunities to modernize, optimize spend, and align technology investments with strategic outcomes. Quantify the business impact and produce a clear roadmap for sustainable IT operations."
          />
        </div>

        <p className="mt-10 text-center text-xs sm:text-sm 2xl:text-xl text-blue-300">
          Watch today’s vision demo. Our next generation of presales architect: <a
            href="#watch"
            className="underline hover:text-white"
          >
            Watch
          </a>
        </p>
      </section>

      {/* Chatbot Widget */}
      <ServiceChatbot />
    </main>
  );
}

type CardProps = {
  title: string;
  description: string;
};

function ServiceCard({ title, description }: CardProps) {
  return (
    <article className="rounded-xl border border-blue-700/50 bg-blue-900/30 p-5 shadow-md shadow-blue-950/40 backdrop-blur-sm">
      <h3 className="text-base sm:text-lg 2xl:text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-xs sm:text-sm 2xl:text-2xl leading-relaxed text-blue-200">{description}</p>
    </article>
  );
}


