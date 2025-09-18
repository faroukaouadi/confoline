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
    <section className="py-12 bg-[linear-gradient(180deg,#0C1B46_0%,#0065A1_30.76%,#0C1B46_100%)]" >
      <div className="max-w-7xl 2xl:max-w-[90%] mx-auto px-4 2xl:my-10">
        <div className="rounded-3xl overflow-hidden bg-[#162456] text-white shadow-2xl border border-white/10">
          <div className="grid md:grid-cols-2 2xl:my-7">
            {/* Left intro */}
            <div className="p-8 md:p-10 2xl:p-12 bg-[#162456] relative">
              <h3 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-extrabold">
                Let’s get to work
              </h3>
              <p className="mt-3 text-sm sm:text-base text-blue-100 max-w-md 2xl:text-lg">
                Explore all the ways ServiceNow can put AI to work for your people.
              </p>
                {/* Email input with button inside */}
                <div className="mt-6 relative">
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="w-full px-4 py-3 pr-24 bg-white text-gray-900 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  <button className="absolute right-1 top-2 bottom-2 px-4 bg-cyan-500 hover:bg-cyan-400 text-white font-medium rounded-md transition-colors">
                    Subscribe
                  </button>
                </div>
              
              <div className="absolute right-0 top-1/8 bottom-1/8 w-0.5 bg-white"></div>
            </div>

            {/* Right list */}
            <div className="divide-y divide-white/10">
              {items.map(({ title, desc, Icon }, i) => (
                <a key={title} href="#" className="group flex items-start gap-4 p-6 md:p-7 2xl:p-8 hover:bg-white/5 transition-colors">
                  <div className="mt-1 flex h-9 w-9 2xl:h-11 2xl:w-11 items-center justify-center rounded-full bg-blue-700/60 ring-1 ring-white/20">
                    <Icon size={18} className="text-white 2xl:size-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-base 2xl:text-xl">{title}</h4>
                      <span className="ml-4 inline-flex h-6 w-6 2xl:h-8 2xl:w-8  items-center justify-center rounded-full bg-cyan-500 text-blue-950 group-hover:bg-cyan-400 transition-colors">
                        <ChevronRight size={16} />
                      </span>
                    </div>
                    <p className="mt-1 text-sm 2xl:text-lg text-blue-100 leading-relaxed">{desc}</p>
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