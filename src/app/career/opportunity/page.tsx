"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useOpportunity } from "../../../hooks/useOpportunity";

export default function OpportunityPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const opportunityId = id ? parseInt(id) : 0;
  
  const { data: opportunity, isLoading: loading, error } = useOpportunity(opportunityId);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#162456] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl">Loading opportunity...</div>
        </div>
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="min-h-screen bg-[#162456] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-400 mb-4">Opportunity not found</div>
          <Link href="/career" className="text-blue-400 hover:text-blue-300">
            Back to Career
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#162456] text-white">
      {/* Back to All Jobs */}
      <section className="py-8 px-4">
        <div className="max-w-[90%] mx-auto">
          <Link href="/career" className="flex items-center text-gray-300 hover:text-white transition-colors gap-2">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.256348 5.38204C-0.0854492 5.72383 -0.0854492 6.27891 0.256348 6.62071L4.63135 10.9957C4.97314 11.3375 5.52822 11.3375 5.87002 10.9957C6.21182 10.6539 6.21182 10.0988 5.87002 9.75704L2.98525 6.87501H11.3743C11.8583 6.87501 12.2493 6.48399 12.2493 6.00001C12.2493 5.51602 11.8583 5.12501 11.3743 5.12501H2.98799L5.86729 2.24297C6.20908 1.90118 6.20908 1.3461 5.86729 1.0043C5.52549 0.662506 4.97041 0.662506 4.62861 1.0043L0.253613 5.3793L0.256348 5.38204Z" fill="white" />
            </svg>
            Back to All Jobs
          </Link>
        </div>
      </section>

      {/* Job Header */}
      <section className="py-8 bg-[#1A337D33]">
        <div className="max-w-[90%] mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm ${
              opportunity.work_type === 'Remote' 
                ? 'bg-[#4A90E2] text-white' 
                : 'bg-green-500 text-white'
            }`}>
              {opportunity.work_type}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">{opportunity.title}</h1>
          <div className="flex flex-wrap gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span>{opportunity.department}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>{opportunity.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              <span>Posted {new Date(opportunity.posted_date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="max-w-[90%] mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Job Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Role Overview */}
              <div className="bg-[#1A337D] p-6 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">Role Overview</h2>
                <div className="space-y-4 text-gray-300">
                  <div dangerouslySetInnerHTML={{ __html: opportunity.description.replace(/\n/g, '<br />') }} />
                </div>
              </div>

              {/* Key Responsibilities */}
              <div className="bg-[#1A337D] p-6 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">Key Responsibilities</h2>
                <ul className="space-y-3 text-gray-300">
                  {opportunity.responsibilities.split('\n').map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[#4A90E2] mt-1">•</span>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div className="bg-[#1A337D] p-6 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                <ul className="space-y-3 text-gray-300">
                  {opportunity.requirements.split('\n').map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What We Offer */}
              <div className="bg-[#1A337D] p-6 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">What We Offer</h2>
                <ul className="space-y-4 text-gray-300">
                  {opportunity.benefits.split('\n').map((benefit, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.00005 0C5.55317 0 6.00005 0.446875 6.00005 1V2.11562C6.05005 2.12187 6.09692 2.12812 6.14692 2.1375C6.15942 2.14062 6.1688 2.14062 6.1813 2.14375L7.6813 2.41875C8.22505 2.51875 8.58442 3.04063 8.48442 3.58125C8.38442 4.12187 7.86255 4.48438 7.32192 4.38438L5.83755 4.1125C4.85942 3.96875 3.99692 4.06563 3.39067 4.30625C2.78442 4.54688 2.54067 4.87812 2.48442 5.18437C2.42192 5.51875 2.4688 5.70625 2.52192 5.82188C2.57817 5.94375 2.69379 6.08125 2.92192 6.23438C3.43129 6.56875 4.21255 6.7875 5.22505 7.05625L5.31567 7.08125C6.20942 7.31875 7.30317 7.60625 8.11567 8.1375C8.55942 8.42812 8.97817 8.82187 9.23755 9.37187C9.50317 9.93125 9.55942 10.5563 9.43754 11.2219C9.22192 12.4094 8.40317 13.2031 7.38755 13.6187C6.95942 13.7937 6.4938 13.9062 6.00005 13.9625V15C6.00005 15.5531 5.55317 16 5.00005 16C4.44692 16 4.00005 15.5531 4.00005 15V13.9094C3.98755 13.9062 3.97192 13.9062 3.95942 13.9031H3.95317C3.19067 13.7844 1.93755 13.4563 1.0938 13.0813C0.59067 12.8562 0.362545 12.2656 0.587545 11.7625C0.812545 11.2594 1.40317 11.0312 1.9063 11.2563C2.55942 11.5469 3.63442 11.8344 4.25629 11.9312C5.25317 12.0781 6.07505 11.9937 6.6313 11.7656C7.15942 11.55 7.40005 11.2375 7.4688 10.8625C7.52817 10.5312 7.4813 10.3406 7.42817 10.225C7.3688 10.1 7.25317 9.9625 7.02192 9.80937C6.50942 9.475 5.72505 9.25625 4.70942 8.9875L4.62192 8.96562C3.7313 8.72812 2.63755 8.4375 1.82505 7.90625C1.3813 7.61562 0.96567 7.21875 0.706295 6.66875C0.443795 6.10938 0.39067 5.48438 0.51567 4.81875C0.74067 3.625 1.63442 2.85 2.65005 2.44688C3.06567 2.28125 3.52192 2.16875 4.00005 2.10313V1C4.00005 0.446875 4.44692 0 5.00005 0Z" fill="white" />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* About Confoline */}
              <div className="bg-[#1A337D] p-6 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">About Confoline</h2>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div className="h-32 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                    <Image src="/images/Office-image.png" alt="Office-image" width={0} height={0} unoptimized className="w-full h-full object-cover" />
                  </div>
                  <div className="h-32 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                    <Image src="/images/Team-image.png" alt="Team-image" width={0} height={0} unoptimized className="w-full h-full object-cover" />
                  </div>
                  <div className="h-32 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center">
                    <Image src="/images/Tech-image.png" alt="Tech-image" width={0} height={0} unoptimized className="w-full h-full object-cover" />
                  </div>
                </div>
                <p className="text-gray-300 mb-6">
                  Confoline is a leading AI and automation platform that helps enterprises streamline their operations through intelligent automation. Founded in 2019, we've grown to serve Fortune 500 companies across various industries, helping them reduce costs, improve efficiency, and accelerate digital transformation.
                </p>
                <p className="text-gray-300 mb-8">
                  Our mission is to democratize AI-powered automation, making it accessible to organizations of all sizes. We're building the future of work, where humans and AI collaborate seamlessly to achieve unprecedented productivity and innovation.
                </p>

                {/* Key Statistics */}
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#4A90E2] mb-2">500+</div>
                    <div className="text-sm text-gray-300">Enterprise Clients</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#4A90E2] mb-2">200+</div>
                    <div className="text-sm text-gray-300">Team Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#4A90E2] mb-2">$50M</div>
                    <div className="text-sm text-gray-300">Series B Funding</div>
                  </div>
                </div>

                {/* Our Values */}
                <div className="bg-[#51A2FF1A] p-3 rounded-2xl border border-[#51A2FF]">
                  <h3 className="text-xl font-bold mb-4">Our Values</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <svg width="11" height="15" viewBox="0 0 11 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.4375 11.25C7.7 10.3777 8.24414 9.63398 8.78281 8.89297C8.925 8.69883 9.06719 8.50469 9.20391 8.30781C9.74531 7.52852 10.0625 6.58516 10.0625 5.56523C10.0625 2.90469 7.90781 0.75 5.25 0.75C2.59219 0.75 0.4375 2.90469 0.4375 5.5625C0.4375 6.58242 0.754688 7.52852 1.29609 8.30508C1.43281 8.50195 1.575 8.69609 1.71719 8.89023C2.25859 9.63125 2.80273 10.3777 3.0625 11.2473H7.4375V11.25ZM5.25 14.75C6.45859 14.75 7.4375 13.7711 7.4375 12.5625V12.125H3.0625V12.5625C3.0625 13.7711 4.04141 14.75 5.25 14.75ZM3.0625 5.5625C3.0625 5.80312 2.86562 6 2.625 6C2.38437 6 2.1875 5.80312 2.1875 5.5625C2.1875 3.86992 3.55742 2.5 5.25 2.5C5.49062 2.5 5.6875 2.69687 5.6875 2.9375C5.6875 3.17812 5.49062 3.375 5.25 3.375C4.04141 3.375 3.0625 4.35391 3.0625 5.5625Z" fill="white" />
                      </svg>
                      <span className="text-gray-300">Innovation First</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg width="19" height="15" viewBox="0 0 19 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.59375 0.75C5.17391 0.75 5.73031 0.980468 6.14055 1.3907C6.55078 1.80094 6.78125 2.35734 6.78125 2.9375C6.78125 3.51766 6.55078 4.07406 6.14055 4.4843C5.73031 4.89453 5.17391 5.125 4.59375 5.125C4.01359 5.125 3.45719 4.89453 3.04695 4.4843C2.63672 4.07406 2.40625 3.51766 2.40625 2.9375C2.40625 2.35734 2.63672 1.80094 3.04695 1.3907C3.45719 0.980468 4.01359 0.75 4.59375 0.75ZM14.6562 0.75C15.2364 0.75 15.7928 0.980468 16.203 1.3907C16.6133 1.80094 16.8438 2.35734 16.8438 2.9375C16.8438 3.51766 16.6133 4.07406 16.203 4.4843C15.7928 4.89453 15.2364 5.125 14.6562 5.125C14.0761 5.125 13.5197 4.89453 13.1095 4.4843C12.6992 4.07406 12.4688 3.51766 12.4688 2.9375C12.4688 2.35734 12.6992 1.80094 13.1095 1.3907C13.5197 0.980468 14.0761 0.75 14.6562 0.75ZM0.65625 8.91758C0.65625 7.30703 1.96328 6 3.57383 6H4.74141C5.17617 6 5.58906 6.0957 5.96094 6.26523C5.92539 6.46211 5.90898 6.66719 5.90898 6.875C5.90898 7.91953 6.36836 8.85742 7.09297 9.5C7.0875 9.5 7.08203 9.5 7.07383 9.5H1.23867C0.91875 9.5 0.65625 9.2375 0.65625 8.91758ZM11.7387 9.5C11.7332 9.5 11.7277 9.5 11.7195 9.5C12.4469 8.85742 12.9035 7.91953 12.9035 6.875C12.9035 6.66719 12.8844 6.46484 12.8516 6.26523C13.2234 6.09297 13.6363 6 14.0711 6H15.2387C16.8492 6 18.1562 7.30703 18.1562 8.91758C18.1562 9.24023 17.8938 9.5 17.5738 9.5H11.7387ZM6.78125 6.875C6.78125 6.17881 7.05781 5.51113 7.55009 5.01884C8.04238 4.52656 8.71006 4.25 9.40625 4.25C10.1024 4.25 10.7701 4.52656 11.2624 5.01884C11.7547 5.51113 12.0312 6.17881 12.0312 6.875C12.0312 7.57119 11.7547 8.23887 11.2624 8.73116C10.7701 9.22344 10.1024 9.5 9.40625 9.5C8.71006 9.5 8.04238 9.22344 7.55009 8.73116C7.05781 8.23887 6.78125 7.57119 6.78125 6.875ZM4.15625 14.0199C4.15625 12.0074 5.78867 10.375 7.80117 10.375H11.0113C13.0238 10.375 14.6562 12.0074 14.6562 14.0199C14.6562 14.4219 14.3309 14.75 13.9262 14.75H4.88633C4.48438 14.75 4.15625 14.4246 4.15625 14.0199Z" fill="white" />
                      </svg>
                      <span className="text-gray-300">Growth Mindset</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.28181 11.2747L3.43689 10.4298C3.20447 10.1973 3.12244 9.861 3.22634 9.54928C3.30838 9.30592 3.41775 8.98874 3.549 8.62506H0.656032C0.420876 8.62506 0.202126 8.49928 0.084548 8.29421C-0.0330301 8.08913 -0.0302957 7.83756 0.0900168 7.63522L1.52556 5.2153C1.88103 4.61647 2.52361 4.25006 3.21814 4.25006H5.46853C5.53416 4.14069 5.59978 4.03952 5.66541 3.94108C7.90486 0.637955 11.2408 0.52858 13.2314 0.894986C13.5486 0.952408 13.7947 1.20124 13.8549 1.51842C14.2213 3.51178 14.1092 6.84499 10.8088 9.08444C10.7131 9.15006 10.6092 9.21569 10.4998 9.28131V11.5317C10.4998 12.2262 10.1334 12.8715 9.53455 13.2243L7.11463 14.6598C6.91228 14.7801 6.66072 14.7829 6.45564 14.6653C6.25056 14.5477 6.12478 14.3317 6.12478 14.0938V11.1626C5.73924 11.2965 5.40291 11.4059 5.14861 11.488C4.84236 11.5864 4.50877 11.5016 4.27908 11.2747H4.28181ZM10.4998 5.34381C10.7899 5.34381 11.0681 5.22858 11.2732 5.02346C11.4783 4.81834 11.5935 4.54014 11.5935 4.25006C11.5935 3.95998 11.4783 3.68178 11.2732 3.47667C11.0681 3.27155 10.7899 3.15631 10.4998 3.15631C10.2097 3.15631 9.9315 3.27155 9.72638 3.47667C9.52127 3.68178 9.40603 3.95998 9.40603 4.25006C9.40603 4.54014 9.52127 4.81834 9.72638 5.02346C9.9315 5.22858 10.2097 5.34381 10.4998 5.34381Z" fill="white" />
                      </svg>
                      <span className="text-gray-300">Collaborative Spirit</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.65626 0.75C6.78204 0.75 6.90782 0.777344 7.02267 0.829297L12.1715 3.01406C12.7731 3.26836 13.2215 3.86172 13.2188 4.57812C13.2051 7.29063 12.0895 12.2535 7.37814 14.5094C6.9215 14.7281 6.39103 14.7281 5.93439 14.5094C1.22306 12.2535 0.107434 7.29063 0.0937624 4.57812C0.0910281 3.86172 0.539466 3.26836 1.14103 3.01406L6.29259 0.829297C6.4047 0.777344 6.53048 0.75 6.65626 0.75Z" fill="white" />
                      </svg>
                      <span className="text-gray-300">Trust & Transparency</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Action & Sharing */}
            <div className="space-y-6">
              {/* Ready to Apply */}
              <div className="bg-[#1A337D] p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">Ready to Apply?</h3>
                <p className="text-gray-300 mb-6">
                  Join our team and help build the future of intelligent automation.
                </p>
                <button className="w-full bg-[#4A90E2] hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors mb-4">
                  Apply for this Position
                </button>
                <button className="w-full border border-white text-white hover:bg-white hover:text-[#0C1B46] px-6 py-3 rounded-lg font-medium transition-colors">
                  Save for Later
                </button>
              </div>

              {/* Share this Job */}
              <div className="bg-[#1A337D] p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4">Share this Job</h3>
                <div className="grid grid-cols-3 place-items-center gap-3">
                  <button className="w-full h-auto p-3 bg-[#162456] rounded-2xl flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                  <button className="w-full h-auto p-3 bg-[#162456] rounded-2xl flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </button>
                  <button className="w-full h-auto p-3 bg-[#162456] rounded-2xl flex items-center justify-center hover:bg-gray-700 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}