"use client";

import Image from "next/image";
import Link from "next/link";
import { useOpportunities } from "../../hooks/useOpportunities";

export default function Career() {
  const { data: opportunities = [], isLoading: loading, error } = useOpportunities();
  return (
    <div className="min-h-screen bg-[#162456] text-white">
      {/* Hero Section */}
      <section className="bg-[#162456] py-20 px-4">
        <div className="max-w-[90%] mx-auto text-center rounded-4xl py-12 bg-[#1A337D] relative overflow-hidden">
          {/* Ellipse top right */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#51A2FF] blur-[114px] rounded-full  transform translate-x-1/2 -translate-y-1/2"></div>
          {/* Ellipse bottom left */}
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#51A2FF] blur-[114px] rounded-full transform -translate-x-1/2 translate-y-1/2"></div>

          <div className="relative z-10 p-4">
            <h1 className="text-5xl lg:text-6xl 2xl:text-7xl font-bold mb-6">
              Build the Future of Intelligent <br /> Automation with Us

            </h1>
            <p className="text-xl mb-12 text-gray-300">
              Join a team where innovation, AI, and human creativity come together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#4A90E2] hover:bg-blue-600 text-white px-8 py-4 rounded-full font-medium transition-colors">
                View Open Positions
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-[#0C1B46] px-8 py-4 rounded-full font-medium transition-colors">
                Join Talent Network
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-20 px-4">
        <div className="max-w-[90%] mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#1A2B5B] p-8 rounded-2xl border text-center">
              <div className="w-16 h-16 bg-[#1A337D] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5 0C13.4312 0 15 1.56875 15 3.5V28.5C15 30.4312 13.4312 32 11.5 32C9.69375 32 8.20625 30.6313 8.01875 28.8687C7.69375 28.9562 7.35 29 7 29C4.79375 29 3 27.2062 3 25C3 24.5375 3.08125 24.0875 3.225 23.675C1.3375 22.9625 0 21.1375 0 19C0 17.0063 1.16875 15.2812 2.8625 14.4812C2.31875 13.8 2 12.9375 2 12C2 10.0813 3.35 8.48125 5.15 8.0875C5.05 7.74375 5 7.375 5 7C5 5.13125 6.2875 3.55625 8.01875 3.11875C8.20625 1.36875 9.69375 0 11.5 0ZM20.5 0C22.3062 0 23.7875 1.36875 23.9813 3.11875C25.7188 3.55625 27 5.125 27 7C27 7.375 26.95 7.74375 26.85 8.0875C28.65 8.475 30 10.0813 30 12C30 12.9375 29.6813 13.8 29.1375 14.4812C30.8313 15.2812 32 17.0063 32 19C32 21.1375 30.6625 22.9625 28.775 23.675C28.9187 24.0875 29 24.5375 29 25C29 27.2062 27.2062 29 25 29C24.65 29 24.3063 28.9562 23.9813 28.8687C23.7938 30.6313 22.3062 32 20.5 32C18.5688 32 17 30.4312 17 28.5V3.5C17 1.56875 18.5688 0 20.5 0Z" fill="white" />
                </svg>

              </div>
              <h3 className="text-2xl font-bold mb-4">Innovate with Purpose</h3>
              <p className="text-gray-300">
                Work on cutting-edge AI that solves real-world enterprise problems.
              </p>
            </div>
            <div className="bg-[#1A2B5B] p-8 rounded-2xl border text-center">
              <div className="w-16 h-16 bg-[#1A337D] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16C22 17.3875 21.925 18.725 21.7938 20H10.2063C10.0688 18.725 10 17.3875 10 16C10 14.6125 10.075 13.275 10.2063 12H21.7938C21.9313 13.275 22 14.6125 22 16ZM23.8 12H31.4937C31.825 13.2812 32 14.6187 32 16C32 17.3813 31.825 18.7188 31.4937 20H23.8C23.9312 18.7125 24 17.375 24 16C24 14.625 23.9312 13.2875 23.8 12ZM30.8375 10H23.5438C22.9188 6.00625 21.6812 2.6625 20.0875 0.525C24.9813 1.81875 28.9625 5.36875 30.8312 10H30.8375ZM21.5187 10H10.4812C10.8625 7.725 11.45 5.7125 12.1687 4.08125C12.825 2.60625 13.5562 1.5375 14.2625 0.8625C14.9625 0.2 15.5437 0 16 0C16.4562 0 17.0375 0.2 17.7375 0.8625C18.4437 1.5375 19.175 2.60625 19.8312 4.08125C20.5562 5.70625 21.1375 7.71875 21.5187 10ZM8.45625 10H1.1625C3.0375 5.36875 7.0125 1.81875 11.9125 0.525C10.3188 2.6625 9.08125 6.00625 8.45625 10ZM0.50625 12H8.2C8.06875 13.2875 8 14.625 8 16C8 17.375 8.06875 18.7125 8.2 20H0.50625C0.175 18.7188 0 17.3813 0 16C0 14.6187 0.175 13.2812 0.50625 12ZM12.1687 27.9125C11.4437 26.2875 10.8625 24.275 10.4812 22H21.5187C21.1375 24.275 20.55 26.2875 19.8312 27.9125C19.175 29.3875 18.4437 30.4563 17.7375 31.1313C17.0375 31.8 16.4562 32 16 32C15.5437 32 14.9625 31.8 14.2625 31.1375C13.5562 30.4625 12.825 29.3938 12.1687 27.9188V27.9125ZM8.45625 22C9.08125 25.9937 10.3188 29.3375 11.9125 31.475C7.0125 30.1812 3.0375 26.6313 1.1625 22H8.45625ZM30.8375 22C28.9625 26.6313 24.9875 30.1812 20.0938 31.475C21.6875 29.3375 22.9187 25.9937 23.55 22H30.8375Z" fill="white" />
                </svg>

              </div>
              <h3 className="text-2xl font-bold mb-4">Flexible & Remote-Friendly</h3>
              <p className="text-gray-300">
                We empower our team to do their best work, wherever they are.
              </p>
            </div>
            <div className="bg-[#1A2B5B] p-8 rounded-2xl border text-center">
              <div className="w-16 h-16 bg-[#1A337D] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.78756 24.0562L7.85631 22.125C7.32506 21.5938 7.13756 20.825 7.37506 20.1125C7.56256 19.5562 7.81256 18.8312 8.11256 18H1.50006C0.962561 18 0.462561 17.7125 0.193811 17.2437C-0.0749394 16.775 -0.0686894 16.2 0.206311 15.7375L3.48756 10.2062C4.30006 8.8375 5.76881 8 7.35631 8H12.5001C12.6501 7.75 12.8001 7.51875 12.9501 7.29375C18.0688 -0.256251 25.6938 -0.506251 30.2438 0.331249C30.9688 0.462499 31.5313 1.03125 31.6688 1.75625C32.5063 6.3125 32.2501 13.9312 24.7063 19.05C24.4876 19.2 24.2501 19.35 24.0001 19.5V24.6437C24.0001 26.2312 23.1626 27.7063 21.7938 28.5125L16.2626 31.7938C15.8001 32.0688 15.2251 32.075 14.7563 31.8062C14.2876 31.5375 14.0001 31.0438 14.0001 30.5V23.8C13.1188 24.1062 12.3501 24.3563 11.7688 24.5438C11.0688 24.7688 10.3063 24.575 9.78131 24.0562H9.78756ZM24.0001 10.5C24.6631 10.5 25.299 10.2366 25.7678 9.76777C26.2367 9.29893 26.5001 8.66304 26.5001 8C26.5001 7.33696 26.2367 6.70107 25.7678 6.23223C25.299 5.76339 24.6631 5.5 24.0001 5.5C23.337 5.5 22.7011 5.76339 22.2323 6.23223C21.7635 6.70107 21.5001 7.33696 21.5001 8C21.5001 8.66304 21.7635 9.29893 22.2323 9.76777C22.7011 10.2366 23.337 10.5 24.0001 10.5Z" fill="white" />
                </svg>

              </div>
              <h3 className="text-2xl font-bold mb-4">Growth-Focused Culture</h3>
              <p className="text-gray-300">
                Accelerate your career with continuous learning and development.
              </p>
            </div>
            <div className="bg-[#1A2B5B] p-8 rounded-2xl border text-center">
              <div className="w-16 h-16 bg-[#1A337D] rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 0C10.3261 0 11.5979 0.526784 12.5355 1.46447C13.4732 2.40215 14 3.67392 14 5C14 6.32608 13.4732 7.59785 12.5355 8.53553C11.5979 9.47322 10.3261 10 9 10C7.67392 10 6.40215 9.47322 5.46447 8.53553C4.52678 7.59785 4 6.32608 4 5C4 3.67392 4.52678 2.40215 5.46447 1.46447C6.40215 0.526784 7.67392 0 9 0ZM32 0C33.3261 0 34.5979 0.526784 35.5355 1.46447C36.4732 2.40215 37 3.67392 37 5C37 6.32608 36.4732 7.59785 35.5355 8.53553C34.5979 9.47322 33.3261 10 32 10C30.6739 10 29.4021 9.47322 28.4645 8.53553C27.5268 7.59785 27 6.32608 27 5C27 3.67392 27.5268 2.40215 28.4645 1.46447C29.4021 0.526784 30.6739 0 32 0ZM0 18.6688C0 14.9875 2.9875 12 6.66875 12H9.3375C10.3312 12 11.275 12.2188 12.125 12.6062C12.0437 13.0562 12.0063 13.525 12.0063 14C12.0063 16.3875 13.0562 18.5312 14.7125 20C14.7 20 14.6875 20 14.6687 20H1.33125C0.6 20 0 19.4 0 18.6688ZM25.3312 20C25.3187 20 25.3062 20 25.2875 20C26.95 18.5312 27.9937 16.3875 27.9937 14C27.9937 13.525 27.95 13.0625 27.875 12.6062C28.725 12.2125 29.6688 12 30.6625 12H33.3312C37.0125 12 40 14.9875 40 18.6688C40 19.4062 39.4 20 38.6688 20H25.3312ZM14 14C14 12.4087 14.6321 10.8826 15.7574 9.75736C16.8826 8.63214 18.4087 8 20 8C21.5913 8 23.1174 8.63214 24.2426 9.75736C25.3679 10.8826 26 12.4087 26 14C26 15.5913 25.3679 17.1174 24.2426 18.2426C23.1174 19.3679 21.5913 20 20 20C18.4087 20 16.8826 19.3679 15.7574 18.2426C14.6321 17.1174 14 15.5913 14 14ZM8 30.3312C8 25.7312 11.7312 22 16.3312 22H23.6688C28.2688 22 32 25.7312 32 30.3312C32 31.25 31.2562 32 30.3312 32H9.66875C8.75 32 8 31.2562 8 30.3312Z" fill="white" />
                </svg>

              </div>
              <h3 className="text-2xl font-bold mb-4">Inclusive & Collaborative</h3>
              <p className="text-gray-300">
                Join a diverse team that values every voice and perspective.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Openings Section */}
      <section className="py-20 px-4 bg-[#162456]">
        <div className="max-w-[90%] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Current Openings</h2>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-3 pl-10 bg-white border border-gray-600 rounded-lg text-[#60646C] placeholder-[#60646C] focus:outline-none focus:border-[#4A90E2]"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#60646C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select className="px-4 py-3 bg-white border border-gray-600 rounded-lg text-[#60646C] focus:outline-none focus:border-[#4A90E2]">
              <option>All Departments</option>
              <option>Engineering</option>
              <option>Product</option>
              <option>Design</option>
            </select>
            <select className="px-4 py-3 bg-white border border-gray-600 rounded-lg text-[#60646C] focus:outline-none focus:border-[#4A90E2]">
              <option>All Locations</option>
              <option>New York, USA</option>
              <option>London, UK</option>
              <option>Remote</option>
            </select>
            <select className="px-4 py-3 bg-white border border-gray-600 rounded-lg text-[#60646C] focus:outline-none focus:border-[#4A90E2]">
              <option>All Work Types</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
            </select>
          </div>

          {/* Job Listings */}
          {loading && (
            <div className="text-center text-white py-8">Loading opportunities...</div>
          )}
          {error && (
            <div className="text-center text-red-400 py-8">{error?.message || "Error loading opportunities"}</div>
          )}
          {!loading && !error && (
            <div className="grid gap-6">
              {opportunities.map((opportunity) => (
                <div key={opportunity.id} className="bg-[#1A337D] p-6 rounded-2xl hover:bg-[#2B4BBF] transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{opportunity.title}</h3>
                      <div className="flex flex-wrap gap-4 text-gray-300 mb-4">
                        <span>{opportunity.department}</span>
                        <span>•</span>
                        <span>{opportunity.location}</span>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          opportunity.work_type === 'Remote' 
                            ? 'bg-[#4A90E2] text-white' 
                            : 'bg-green-500 text-white'
                        }`}>
                          {opportunity.work_type}
                        </span>
                      </div>
                    </div>
                    <Link 
                      href={`/career/opportunity?id=${opportunity.id}`} 
                      className="bg-[#4A90E2] hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
                    >
                      Apply
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <button className="border border-white text-white hover:bg-white hover:text-[#0C1B46] px-8 py-4 rounded-full font-medium transition-colors">
              View All Positions
            </button>
          </div>
        </div>
      </section>

      {/* Don't See Your Position Section */}
      <section className="py-20 px-4 relative bg-[url('/images/bg-career.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-[#05162A99]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="p-12 rounded-2xl">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Don&apos;t See Your Position listed?</h2>
            <p className="text-xl text-gray-300 mb-8">
              We&apos;re always on the lookout for great people, We&apos;ll get in touch if there&apos;s a match!
            </p>
            <button className="bg-[#51A2FF] hover:bg-blue-600 text-white px-8 py-4 rounded-full font-medium transition-colors">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* Life at Confoline Section */}
      <section className="py-20  bg-[#162456]">
        <div className="max-w-[100%] py-20 mx-auto bg-[#1A337D] ">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Life at Confoline</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="w-[80%] h-80 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center rounded-2xl mx-auto overflow-hidden">
                <Image src="/images/team-collaboration.png" alt="team-collaboration" width={0} height={0} unoptimized className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="relative overflow-hidden">
              <div className="w-[80%] h-80 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center rounded-2xl mx-auto overflow-hidden">
                <Image src="/images/developer-working.png" alt="developer-working" width={0} height={0} unoptimized className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <div className="w-[80%] h-80 bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center rounded-2xl mx-auto overflow-hidden">
                <Image src="/images/team-outing.png" alt="team-outing" width={0} height={0} unoptimized className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
