"use client";

import { ChevronRight, Users, MessageCircle, Handshake, MonitorPlay } from "lucide-react";

const items = [
  { title: "Contact us", desc: "Talk to a ServiceNow expert and see how a single platform can solve your most pressing needs.", Icon: MessageCircle },
  { title: "Join the community", desc: "Learn, share, and connect with people doing work that matters on the ServiceNow AI Platform.", Icon: Users },
  { title: "Find a partner", desc: "Realize even more value with a ServiceNow partner—Resellers, Service Providers, Implementation partners and more.", Icon: Handshake },
  { title: "Explore demos", desc: "Get hands-on with the ServiceNow AI Platform. Explore demo options for everyone, at every skill level.", Icon: MonitorPlay },
];

export default function Work() {
  return (
    <section className="py-12 bg-gradient-to-br from-blue-950 to-blue-900" >
      <div className="max-w-7xl 2xl:max-w-[80%] mx-auto px-4 2xl:py-2">
        <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800 text-white shadow-2xl border border-white/10">
          <div className="grid md:grid-cols-2">
            {/* Left intro */}
            <div className="p-8 md:p-10 2xl:p-12 bg-gradient-to-br from-blue-900/70 to-blue-800/70">
              <h3 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-extrabold">
                Let’s <span className="text-cyan-400">get to work</span>
              </h3>
              <p className="mt-3 text-sm sm:text-base text-blue-100 max-w-md 2xl:text-lg">
                Explore all the ways ServiceNow can put AI to work for your people.
              </p>
            </div>

            {/* Right list */}
            <div className="divide-y divide-white/10">
              {items.map(({ title, desc, Icon }, i) => (
                <a key={title} href="#" className="group flex items-start gap-4 p-6 md:p-7 2xl:p-8 hover:bg-white/5 transition-colors">
                  <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-blue-700/60 ring-1 ring-white/20">
                    <Icon size={18} className="text-cyan-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-base 2xl:text-lg">{title}</h4>
                      <span className="ml-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-blue-950 group-hover:bg-cyan-400 transition-colors">
                        <ChevronRight size={16} />
                      </span>
                    </div>
                    <p className="mt-1 text-sm 2xl:text-base text-blue-100 leading-relaxed">{desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}