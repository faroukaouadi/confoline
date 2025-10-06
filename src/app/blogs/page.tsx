"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Post = {
  id: string;
  category: string;
  title: string;
  href: string;
  imageSrc: string;
  readingTime: string;
  date: string;
};

type TabType = "blog" | "report" | "news";

const BLOG_POSTS: Post[] = [
  {
    id: "1",
    category: "Branding",
    title: "How We Made a Boring B2B Brand Go Viral",
    href: "#",
    imageSrc: "/images/employee1.jpg",
    readingTime: "1 minute of reading",
    date: "April 23, 2025",
  },
  {
    id: "2",
    category: "Web Development",
    title: "How We Built A 98/100 PageSpeed Score Website In 2 Weeks",
    href: "#",
    imageSrc: "/images/employee2.jpg",
    readingTime: "1 minute of reading",
    date: "April 23, 2025",
  },
  {
    id: "3",
    category: "Branding",
    title: "The $500 Rebrand That Made Our Client Look Like A Fortune 500",
    href: "#",
    imageSrc: "/images/employee3.jpg",
    readingTime: "2 minutes of reading",
    date: "April 23, 2025",
  },
  {
    id: "4",
    category: "SEO",
    title: "From 0 to 50k Organic Visits: Our Playbook",
    href: "#",
    imageSrc: "/images/team.jpg",
    readingTime: "4 minutes of reading",
    date: "April 12, 2025",
  },
  {
    id: "5",
    category: "Design",
    title: "Design Systems that Scale Across Teams",
    href: "#",
    imageSrc: "/images/services-confoline.png",
    readingTime: "3 minutes of reading",
    date: "April 10, 2025",
  },
  {
    id: "6",
    category: "Growth",
    title: "10 Low‑Lift Experiments That Actually Move the Needle",
    href: "#",
    imageSrc: "/images/employee1.jpg",
    readingTime: "5 minutes of reading",
    date: "April 8, 2025",
  },
];

const REPORT_POSTS: Post[] = [
  {
    id: "r1",
    category: "Analytics",
    title: "Q4 2024 Digital Marketing Performance Report",
    href: "#",
    imageSrc: "/images/employee1.jpg",
    readingTime: "5 minutes of reading",
    date: "April 20, 2025",
  },
  {
    id: "r2",
    category: "Research",
    title: "State of B2B SaaS: Customer Acquisition Trends",
    href: "#",
    imageSrc: "/images/employee2.jpg",
    readingTime: "8 minutes of reading",
    date: "April 18, 2025",
  },
  {
    id: "r3",
    category: "Data",
    title: "Conversion Rate Optimization: A Complete Analysis",
    href: "#",
    imageSrc: "/images/employee3.jpg",
    readingTime: "6 minutes of reading",
    date: "April 15, 2025",
  },
  {
    id: "r4",
    category: "Benchmark",
    title: "2025 Benchmark: Load Time vs. Conversion",
    href: "#",
    imageSrc: "/images/employee2.jpg",
    readingTime: "7 minutes of reading",
    date: "April 14, 2025",
  },
  {
    id: "r5",
    category: "Security",
    title: "Web Security Posture Report for SMEs",
    href: "#",
    imageSrc: "/images/employee3.jpg",
    readingTime: "9 minutes of reading",
    date: "April 11, 2025",
  },
  {
    id: "r6",
    category: "Finance",
    title: "Marketing Spend Efficiency Report 2025",
    href: "#",
    imageSrc: "/images/team.jpg",
    readingTime: "6 minutes of reading",
    date: "April 9, 2025",
  },
];

const NEWS_POSTS: Post[] = [
  {
    id: "n1",
    category: "Industry",
    title: "New AI Tools Revolutionizing Web Development",
    href: "#",
    imageSrc: "/images/employee1.jpg",
    readingTime: "3 minutes of reading",
    date: "April 22, 2025",
  },
  {
    id: "n2",
    category: "Updates",
    title: "Confoline Partners with Leading Tech Companies",
    href: "#",
    imageSrc: "/images/employee2.jpg",
    readingTime: "2 minutes of reading",
    date: "April 21, 2025",
  },
  {
    id: "n3",
    category: "Events",
    title: "Upcoming Webinar: Future of Digital Marketing",
    href: "#",
    imageSrc: "/images/employee3.jpg",
    readingTime: "1 minute of reading",
    date: "April 19, 2025",
  },
  {
    id: "n4",
    category: "Product",
    title: "We Launched a Lightning‑Fast Starter Kit",
    href: "#",
    imageSrc: "/images/services-confoline.png",
    readingTime: "1 minute of reading",
    date: "April 18, 2025",
  },
  {
    id: "n5",
    category: "Hiring",
    title: "We’re Hiring Senior Frontend Engineers",
    href: "#",
    imageSrc: "/images/employee1.jpg",
    readingTime: "1 minute of reading",
    date: "April 16, 2025",
  },
  {
    id: "n6",
    category: "Community",
    title: "Recap: Confoline Builders Meetup",
    href: "#",
    imageSrc: "/images/employee2.jpg",
    readingTime: "2 minutes of reading",
    date: "April 13, 2025",
  },
];

const TAB_DATA = {
  blog: {
    posts: BLOG_POSTS,
    title: "Blogs",
    subtitle: "Get actionable tips and war stories—no fluff, just fuel. Join 5,000+ builders."
  },
  report: {
    posts: REPORT_POSTS,
    title: "Reports",
    subtitle: "Comprehensive insights and performance metrics to guide your business decisions."
  },
  news: {
    posts: NEWS_POSTS,
    title: "News",
    subtitle: "Stay informed with the latest trends, partnerships, and industry developments."
  }
};

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState<TabType>("blog");
  const currentData = TAB_DATA[activeTab];

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-[linear-gradient(180deg,#0C1B46_0%,#0065A1_30.76%,#0C1B46_100%)] text-white">
        <div className="mx-auto max-w-7xl 2xl:max-w-[90%] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1 rounded-full border border-[#51A2FF] p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)] backdrop-blur-sm">
              <button
                onClick={() => setActiveTab("blog")}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                  activeTab === "blog"
                    ? "bg-[#1A337D] text-white shadow-inner ring-1 ring-white/30"
                    : "text-[#8C8C8C]    hover:bg-white/10"
                }`}
              >
                blog
              </button>
              <button
                onClick={() => setActiveTab("report")}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                  activeTab === "report"
                   ? "bg-[#1A337D] text-white shadow-inner ring-1 ring-white/30"
                    : "text-[#8C8C8C]    hover:bg-white/10"
                }`}
              >
                Report
              </button>
              <button
                onClick={() => setActiveTab("news")}
                className={`rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                  activeTab === "news"
                    ? "bg-[#1A337D] text-white shadow-inner ring-1 ring-white/30"
                    : "text-[#8C8C8C]    hover:bg-white/10"
                }`}
              >
                News
              </button>
            </div>
          </div>

          {/* Small label under tabs */}
          <p className="mt-6 text-center text-white/90 font-semibold">
           {currentData.title}
          </p>

          {/* Title */}
          <h1 className="mt-3 text-4xl sm:text-6xl 2xl:text-7xl font-extrabold tracking-tight text-center">
          <span className="text-[#51A2FF]">Insights to Help You Move</span>
                <br />
               Forward Smarter
          </h1>
          <p className="mt-5 mx-auto max-w-3xl text-center text-blue-200 text-sm sm:text-base 2xl:text-xl">
            {currentData.subtitle}
          </p>
        </div>
        <div className="h-px w-full bg-white/10" />
      </section>

      {/* CTA Panel */}
      <section className="relative bg-white">


        {/* Posts grid */}
        <div className="mx-auto max-w-7xl 2xl:max-w-[90%] px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentData.posts.map((post) => (
              <article
                key={post.id}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <Link href={post.href} className="block">
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden">
                    <Image
                      src={post.imageSrc}
                      alt={post.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="text-xs sm:text-sm text-blue-600 font-medium">{post.category}</p>
                    <h3 className="mt-1 text-base sm:text-lg 2xl:text-xl font-semibold text-gray-900 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-3 text-xs text-gray-500">
                      {post.date} / {post.readingTime}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* See more button */}
          <div className="mt-10 flex justify-center">
            <button className="rounded-full bg-white px-6 py-2 text-sm font-medium text-black border border-black">See more</button>
          </div>
        </div>
      </section>
      <section className="bg-blue-950 text-white py-10">
      <div className="mx-auto max-w-7xl 2xl:max-w-[90%] px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
          <div className="rounded-3xl bg-[#1A337D] text-white px-6 sm:px-10 py-10 sm:py-12 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] border border-white/10">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="h-20 w-20 rounded-full border-4 border-[#51A2FF] overflow-hidden">
                <Image src="/images/employee2.jpg" alt="Lead designer" width={0} height={0} unoptimized className="object-cover w-full h-full" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">Meet the Minds Behind the Magic</h2>
              <p className="text-blue-200 text-sm sm:text-base">Get a free 30-minute strategy session with our lead designer.</p>
              <button className="mt-5 rounded-full bg-[#51A2FF] px-5 py-4 text-sm font-medium text-white">Book a Free Call</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}


