import Image from "next/image";

export default function Company() {
  return (
    <div className="min-h-screen bg-[#162456] text-white">
      {/* About confoline Section */}
      <section className=" py-20 px-4">
         <div className="max-w-[90%] mx-auto bg-[#1A337D] rounded-4xl">
           <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-6 lg:p-12">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                About <span className="text-[#4A90E2]">confoline</span>
              </h1>
               <p className="text-xl mb-12 text-white">
                 We&apos;re a forward-thinking technology company dedicated to transforming businesses through innovative digital solutions and cutting-edge technology.
               </p>
               <div className="grid grid-cols-3 gap-4 lg:gap-8">
                 <div className="text-center lg:text-left">
                   <div className="text-3xl lg:text-4xl font-bold text-white mb-2">15+</div>
                   <div className="text-xs lg:text-sm text-white">Years Experience</div>
                 </div>
                 <div className="text-center lg:text-left">
                   <div className="text-3xl lg:text-4xl font-bold text-white mb-2">500+</div>
                   <div className="text-xs lg:text-sm text-white">Projects Completed</div>
                 </div>
                 <div className="text-center lg:text-left">
                   <div className="text-3xl lg:text-4xl font-bold text-white mb-2">50+</div>
                   <div className="text-xs lg:text-sm text-white">Team Members</div>
                 </div>
               </div>
            </div>
             <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-lg lg:w-[28rem] h-80 lg:h-96 bg-gradient-to-br from-stone-300 to-stone-500 rounded-3xl flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-b from-stone-200 to-stone-400 rounded-lg">
                 <Image src="/images/team.jpg" alt="company" width={0} height={0} unoptimized className="object-cover w-full h-full" />
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4">
         <div className="max-w-[90%] mx-auto">
           <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
             <div className="flex justify-center col-span-2 order-2 lg:order-1">
               <div className="w-full max-w-md lg:max-w-none h-80 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                  <Image src="/images/story-page-2.png" alt="company" width={0} height={0} unoptimized className="w-full h-full object-cover" />
               </div>
             </div>  
             <div className="col-span-3 order-1 lg:order-2">
              <h2 className="text-4xl lg:text-5xl font-bold mb-8">Our Story</h2>
              <div className="space-y-6 text-gray-300 2xl:text-xl">
                <p>
                  Founded in 2008 as a small startup with a vision to democratize technology, we began our journey with just two passionate individuals working from a garage. What started as a dream to make technology accessible to everyone has grown into a leading technology consultancy that serves clients across various industries.
                </p>
                <p>
                  Today, we serve clients from innovative startups to Fortune 500 companies, helping them navigate the complex digital landscape and achieve their business objectives through innovative technology solutions. Our commitment to excellence and innovation continues to drive us forward as we shape the future of technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 px-4">
        <div className="max-w-[90%] mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-center">Mission & Vision</h2>
          <p className="text-xl text-gray-300 mb-16 text-center">
            Our core values and aspirations that drive everything we do
          </p>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-[#1A337D] p-8 rounded-2xl">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                <Image src="/images/covid_transmission-virus.png" alt="confoLogo" width={0} height={0} unoptimized className="w-auto h-auto" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-300 2xl:text-xl">
                To empower businesses with innovative technology solutions that drive growth, efficiency, and competitive advantage. We believe technology should be a catalyst for success, not a barrier.
              </p>
            </div>
            <div className="bg-[#1A337D] p-8 rounded-2xl">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 ">
              <Image src="/images/hugeicons_vision.png" alt="confoLogo" width={0} height={0} unoptimized className="w-auto h-auto"/>
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-300 2xl:text-xl">
                To be the world&apos;s most trusted technology partner, known for delivering exceptional results and fostering long-term relationships built on innovation, integrity, and excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-[linear-gradient(180deg,#0C1B46_0%,#0065A1_30.76%,#0C1B46_100%)] py-20 px-4">
        <div className="max-w-[90%] mx-auto text-center">
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Our Core Values</h2>
          <p className="text-xl text-gray-300 mb-16">
            The principles that guide our decisions and shape our culture
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-lg">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 mx-auto">
               <Image src="/images/streamline-plump_industry-innovation-and-infrastructure.png" alt="cofoLogo" width={0} height={0} unoptimized className="w-auto h-auto"/>
              </div>
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-300 text-sm 2xl:text-lg">
                We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.
              </p>
            </div>
            <div className="p-6 rounded-lg">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 mx-auto">
              <Image src="/images/arcticons_play-integrity-api-checker.png" alt="cofoLogo" width={0} height={0} unoptimized className="w-auto h-auto"/>
              </div>
              <h3 className="text-xl font-bold mb-3">Integrity</h3>
              <p className="text-gray-300 text-sm 2xl:text-lg">
                We conduct business with honesty, transparency, and ethical practices in all our interactions.
              </p>
            </div>
            <div className="p-6 rounded-lg">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image src="/images/material-symbols_star-rounded.png" alt="confoLogo" width={0} height={0} unoptimized className="w-auto h-auto"/>
              </div>
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-300 text-sm 2xl:text-lg">
                We strive for perfection in every project, delivering quality that exceeds expectations.
              </p>
            </div>
            <div className="p-6 rounded-lg">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 mx-auto">
                <Image src="/images/streamline_collaborations-idea.png" alt="confoLogo" width={0} height={0} unoptimized className="w-auto h-auto" />
              </div>
              <h3 className="text-xl font-bold mb-3">Collaboration</h3>
              <p className="text-gray-300 text-sm 2xl:text-lg">
                We believe in the power of teamwork and building strong partnerships with our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-[90%] mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Leadership Team</h2>
          <p className="text-xl text-gray-300 mb-16">
            Meet the visionary leaders driving our company forward
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
               <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
                <Image src="images/team1.png" alt="team1" width={0} height={0} unoptimized className="w-full h-full object-cover " />
              </div>
              <h3 className="text-xl font-bold mb-2">John Anderson</h3>
              <p className="text-gray-300 mb-4">Chief Executive Officer</p>
              <div className="flex justify-center space-x-4">
                <div className="w-8 h-8 rounded flex items-center justify-center">
                <Image src="/images/linkedin.svg" alt="linkedin" width={0} height={0} unoptimized className="w-auto h-auto" />
                </div>
                {/* <div className="w-8 h-8  rounded flex items-center justify-center">
                <Image src="/images/youtube.svg" alt="linkedin" width={0} height={0} unoptimized className="w-auto h-auto" />
                </div> */}
              </div>
            </div>
            <div className="text-center">
               <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
              <Image src="images/team2.png" alt="team2" width={0} height={0} unoptimized className="w-full h-full object-cover " />
              </div>
              <h3 className="text-xl font-bold mb-2">Andunre</h3>
              <p className="text-gray-300 mb-4">Chief Technology Officer</p>
              <div className="flex justify-center space-x-4">
                <div className="w-8 h-8  rounded flex items-center justify-center">
                <Image src="/images/linkedin.svg" alt="linkedin" width={0} height={0} unoptimized className="w-auto h-auto" />
                </div>
                {/* <div className="w-8 h-8  rounded flex items-center justify-center">
                <Image src="/images/youtube.svg" alt="linkedin" width={0} height={0} unoptimized className="w-auto h-auto" />
                </div> */}
              </div>
            </div>
            <div className="text-center">
               <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
              <Image src="images/team1.png" alt="team1" width={0} height={0} unoptimized className="w-full h-full object-cover " />
              </div>
              <h3 className="text-xl font-bold mb-2">Sarah Johnson</h3>
              <p className="text-gray-300 mb-4">Chief Operating Officer</p>
              <div className="flex justify-center space-x-4">
                <div className="w-8 h-8  rounded flex items-center justify-center">
                <Image src="/images/linkedin.svg" alt="linkedin" width={0} height={0} unoptimized className="w-auto h-auto" />
                </div>
                {/* <div className="w-8 h-8  rounded flex items-center justify-center">
                <Image src="/images/youtube.svg" alt="linkedin" width={0} height={0} unoptimized className="w-auto h-auto" />
                </div> */}
              </div>
            </div>
            <div className="text-center">
               <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
              <Image src="images/team2.png" alt="team1" width={0} height={0} unoptimized className="w-full h-full object-cover " />
              </div>
              <h3 className="text-xl font-bold mb-2">Michael Chen</h3>
              <p className="text-gray-300 mb-4">Chief Financial Officer</p>
              <div className="flex justify-center space-x-4">
                <div className="w-8 h-8  rounded flex items-center justify-center">
                <Image src="/images/linkedin.svg" alt="linkedin" width={0} height={0} unoptimized className="w-auto h-auto"/>
                </div>
                {/* <div className="w-8 h-8  rounded flex items-center justify-center">
                  <Image src="/images/youtube.svg" alt="linkedin" width={0} height={0} unoptimized className="w-auto h-auto" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
