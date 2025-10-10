"use client";

import Image from "next/image";
import { useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import ContactPopup from "../components/ContactPopup";

const LOCATIONS_DATA = {
  "North America": [
    {
      id: 1,
      title: "Australia, Brisbane (WeWork)",
      address: ["2225 Lawson Lane", "Santa Clara, CA 95054"]
    },
    {
      id: 2,
      title: "Canada, Montreal",
      address: ["6650 St Urbain Street, Suite 500", "Montreal, QC H2S 3G9"]
    },
    {
      id: 3,
      title: "Canada, Toronto",
      address: ["161 Bay Street, Suite 1300", "Toronto, ON M5J 2S1"]
    },
    {
      id: 4,
      title: "USA, California, Pleasanton",
      address: ["4305 Hacienda Drive, Suite 200", "Pleasanton, CA 94588"]
    },
    {
      id: 5,
      title: "USA, California, San Diego",
      address: ["4810 Eastgate Mall", "San Diego, CA 92121"]
    },
    {
      id: 6,
      title: "USA, California, San Francisco",
      address: ["101 Green Street, Floor 5", "San Francisco, CA 94111"]
    },
    {
      id: 7,
      title: "USA, Colorado, Denver (Venture X)",
      address: ["1800 Wazee St, Suite 300", "Denver, CO 80202"]
    },
    {
      id: 8,
      title: "USA, Florida, Orlando",
      address: ["12900 Science Drive, Suite 100", "Orlando, FL 32826"]
    }
  ],
  "Latin America": [
    {
      id: 9,
      title: "Brazil, São Paulo",
      address: ["Av. Paulista, 1000", "São Paulo, SP 01310-100"]
    },
    {
      id: 10,
      title: "Mexico, Mexico City",
      address: ["Paseo de la Reforma 250", "Ciudad de México, 06600"]
    }
  ],
  "Middle East, and Africa": [
    {
      id: 11,
      title: "UAE, Dubai",
      address: ["Sheikh Zayed Road", "Dubai, UAE"]
    },
    {
      id: 12,
      title: "South Africa, Cape Town",
      address: ["V&A Waterfront", "Cape Town, 8001"]
    }
  ],
  "Asia Pacific and Japan": [
    {
      id: 13,
      title: "Japan, Tokyo",
      address: ["Shibuya Crossing", "Tokyo, Japan"]
    },
    {
      id: 14,
      title: "Singapore",
      address: ["Marina Bay Sands", "Singapore 018956"]
    }
  ]
};

const TABS = ["North America", "Latin America", "Middle East, and Africa", "Asia Pacific and Japan"];

export default function LocationsPage() {
  const [activeTab, setActiveTab] = useState("North America");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const currentLocations = LOCATIONS_DATA[activeTab as keyof typeof LOCATIONS_DATA];

  const isValidEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
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
    <main className="min-h-screen">
      {/* Header Banner */}
      <section className="bg-[linear-gradient(180deg,#0C1B46_0%,#0065A1_30.76%,#0C1B46_100%)] py-6">
        <div className="mx-auto max-w-[90%] px-4 sm:px-6 lg:px-8 ">
          <div className="flex flex-col sm:flex-row items-center justify-center">
            <p className="text-white text-center text-sm sm:text-xl 2xl:text-3xl">
              See the AI experience by ServiceNow—the UI for Enterprise AI.
            </p>
            <button className="ml-4 bg-[#51A2FF] hover:bg-[#4A90E2] text-white px-6 py-3 rounded-full font-medium text-xs sm:text-sm 2xl:text-2xl transition-colors duration-300">
              Explore AI Experience
            </button>
          </div>
        </div>
      </section>

       {/* Main Content */}
       <section className="bg-[#0C1B46] py-10 sm:py-10 2xl:py-16">
        <div className="mx-auto max-w-[90%] px-4 sm:px-6 lg:px-8 ">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8 lg:col-span-2">
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#51A2FF] mb-4">
                Confoline Locations
                </h1>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                  TODAY
                </h2>
              </div>
              
              <div className="space-y-2 text-white">
                <p className="text-lg sm:text-xl">Headquarters</p>
                <p className="text-lg sm:text-xl">6 Rue des Bateliers</p>
                <p className="text-lg sm:text-xl">92110 Clichy</p>
                <p className="text-lg sm:text-xl">France</p>
              </div>
              
              <button 
                onClick={() => setIsContactModalOpen(true)}
                className="bg-[#51A2FF] hover:bg-[#4A90E2] text-white px-8 py-3 rounded-full font-medium text-lg transition-colors duration-300"
              >
                Contact Us
              </button>
            </div>

            {/* Right Column - Image */}
            <div className="relative lg:col-span-1">
              <div className="relative w-full h-60 sm:h-70 lg:h-80 2xl:h-96 rounded-2xl overflow-hidden">
                <Image
                  src="/images/location-logo.jpg"
                  alt="Train crossing a stone viaduct"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
           </div>
         </div>
       </section>

       {/* Locations Tabs Section */}
       <section className="bg-white py-10">
         <div className="mx-auto max-w-[90%] px-4 sm:px-6 lg:px-8">
           {/* Tabs Navigation */}
           <div className="flex sm:flex-wrap justify-center sm:gap-4 mb-16">
             {TABS.map((tab) => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-1 lg:px-15 2xl:px-20 py-3 text-xs lg:text-lg 2xl:text-2xl font-medium transition-colors duration-300 border-b-2 cursor-pointer ${
                   activeTab === tab
                     ? "text-[#51A2FF] border-[#51A2FF]"
                     : "text-gray-500 border-transparent hover:text-gray-700"
                 }`}
               >
                 {tab}
               </button>
             ))}
           </div>

           {/* Section Title */}
           <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-gray-900 mb-16">
             {activeTab}
           </h2>

           {/* Locations Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
             {currentLocations.map((location) => (
               <div
                 key={location.id}
                  className="bg-[#1A337D] rounded-lg p-6 text-white hover:bg-[#4A90E2] transition-colors duration-300 cursor-pointer"
               >
                 <h3 className="text-lg font-semibold mb-3">{location.title}</h3>
                 <div className="space-y-1">
                   {location.address.map((line, index) => (
                     <p key={index} className="text-sm text-white">{line}</p>
                   ))}
                 </div>
               </div>
             ))}
           </div>

           {/* See More Button */}
           {/* <div className="text-center">
             <button className="bg-white border border-black text-black px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors duration-300">
               See More
             </button>
           </div> */}
         </div>
       </section>

       {/* CTA Subscription Section */}
       <section className="bg-[#0C1B46] py-10 2xl:py-28">
         <div className="mx-auto max-w-[70%] px-4 sm:px-6 lg:px-8">
           <div className="bg-[#1A337D] rounded-3xl p-8 sm:p-12 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] border border-white/10">
             <div className="text-center space-y-6">
               {/* Title */}
               <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white">
               Stay Ahead with Confoline Insights
               </h2>
               
               {/* Subtitle */}
               <p className="text-blue-200 text-sm sm:text-xl max-w-2xl mx-auto">
               Join our mailing list and get a free assessment package, personalized strategy review.
               </p>
               
               {/* Email Form */}
               <form onSubmit={handleSubscribe} className="relative flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                 <input
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="Email"
                   disabled={loading}
                   required
                   className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                 />
                 <button
                   type="submit"
                   disabled={loading}
                   className="sm:absolute right-1 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white sm:px-8 rounded-lg font-medium transition-colors duration-300 whitespace-nowrap flex items-center gap-2"
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
               </form>
               
               {/* Message display */}
               {error && (
                 <div className="mt-3 flex items-center justify-center gap-2 text-sm text-red-400">
                   <XCircle size={16} />
                   <span>{error}</span>
                 </div>
               )}
               {message && (
                 <div className="mt-3 flex items-center justify-center gap-2 text-sm text-green-400">
                   <CheckCircle size={16} />
                   <span>{message}</span>
                 </div>
               )}
             </div>
           </div>
         </div>
       </section>
       
       {/* Contact Modal */}
       <ContactPopup 
         open={isContactModalOpen} 
         onClose={() => setIsContactModalOpen(false)} 
       />
     </main>
   );
 }
