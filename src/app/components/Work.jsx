"use client";

import { useState } from "react";
import { ChevronRight, Users, MessageCircle, Handshake, MonitorPlay, CheckCircle, XCircle, Loader2 } from "lucide-react";

const items = [
  { title: "Contact us", desc: "Speak with a Confoline expert to see how Vision, our AI-Driven Advisor, can help you make the right decision.", Icon: MessageCircle },
  { title: "Join the community", desc: "Learn, share, and connect with people doing work that matters on Observibility, Service Management, and Application Delivery Management", Icon: Users },
  { title: "Discover our patnerships", desc: "Explore our partnerships, discover our technical expertise, and see our vision for the future.", Icon: Handshake },
  { title: "Explore demos", desc: "GExplore a wide range of technologies from leading providers. Find the perfect hands-on demo, no matter your skill level.", Icon: MonitorPlay },
];

export default function Work() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // success or error text
  const [error, setError] = useState(null);

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      // ⚠️ en dev on appelle le serveur PHP local ; en prod adapte la base URL
      const API_BASE = process.env.NODE_ENV === 'development'
        ? 'http://127.0.0.1:8000/admin/confoline-Api/subscribe.php' // ton serveur PHP local
        : '/admin/confoline-Api/subscribe.php'; // chemin relatif en production

      // Ajouter un délai pour voir le loading
      await new Promise(resolve => setTimeout(resolve, 2000)); // 2 secondes de délai

      const res = await fetch(`${API_BASE}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json?.error || 'Server error');
      } else {
        setMessage(json?.message || 'Subscribed successfully.');
        setEmail('');
      }
    } catch (err) {
      console.error(err);
      setError('Network error — could not reach server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 bg-[linear-gradient(180deg,#0C1B46_0%,#0065A1_30.76%,#0C1B46_100%)]" >
      <div className="max-w-7xl 2xl:max-w-[90%] mx-auto px-4 2xl:my-10">
        <div className="rounded-3xl overflow-hidden bg-[#162456] text-white shadow-2xl border border-white/10">
          <div className="grid md:grid-cols-2 2xl:my-7">
            {/* Left intro */}
            <div className="p-8 md:p-10 2xl:p-12 bg-[#162456] relative">
              <h3 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-extrabold">
              Stay ahead of the curve
              </h3>
              <p className="mt-3 text-sm sm:text-base text-blue-100 max-w-md 2xl:text-lg">
              Explore all the ways Confoline can put AI to increase your business outcomes.
              </p>
              
              {/* Email subscription form */}
              <form onSubmit={handleSubmit} className="mt-6">
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-3 pr-24 bg-white text-gray-900 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={loading}
                    className="absolute right-1 top-2 bottom-2 px-4 bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-600 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span className="hidden sm:inline">Subscribing...</span>
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>
                
                {/* Message display */}
                {error && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-red-400">
                    <XCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}
                {message && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-green-400">
                    <CheckCircle size={16} />
                    <span>{message}</span>
                  </div>
                )}
              </form>
              
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