"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useNews } from "../../hooks/useNews";

type TabType = "blog" | "report" | "news";

const TAB_DATA = {
  blog: {
    title: "Blogs",
    subtitle: "Get actionable tips and war stories—no fluff, just fuel. Join 5,000+ builders."
  },
  report: {
    title: "Reports", 
    subtitle: "Comprehensive insights and performance metrics to guide your business decisions."
  },
  news: {
    title: "News",
    subtitle: "Stay informed with the latest trends, partnerships, and industry developments."
  }
};

function BlogContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>("blog");
  const [showAll, setShowAll] = useState(false);
  const { data: news = [], isLoading: loading, error } = useNews();
  const currentData = TAB_DATA[activeTab];

  // Initialize activeTab from URL parameter
  useEffect(() => {
    const tabParam = searchParams.get('activeTab');
    if (tabParam && ['blog', 'report', 'news'].includes(tabParam)) {
      setActiveTab(tabParam as TabType);
    }
  }, [searchParams]);

  // Reset showAll when activeTab changes
  useEffect(() => {
    setShowAll(false);
  }, [activeTab]);

  // Filter news by category based on active tab
  const filteredNews = news.filter(item => {
    const category = item.category.toLowerCase();
    switch (activeTab) {
      case "blog":
        return category === "blog" || category === "branding" || category === "web development" || 
               category === "seo" || category === "design" || category === "growth";
      case "report":
        return category === "report" || category === "analytics" || category === "research" || 
               category === "data" || category === "benchmark" || category === "security" || 
               category === "finance";
      case "news":
        return category === "news" || category === "industry" || category === "updates" || 
               category === "events" || category === "product" || category === "hiring" || 
               category === "community";
      default:
        return true;
    }
  });

  // Display posts (max 6 initially, all if showAll is true)
  const displayedNews = showAll ? filteredNews : filteredNews.slice(0, 6);
  const hasMorePosts = filteredNews.length > 6;

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Helper function to estimate reading time
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} minute${minutes !== 1 ? 's' : ''} of reading`;
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-[linear-gradient(180deg,#0C1B46_0%,#0065A1_30.76%,#0C1B46_100%)] text-white">
        <div className="mx-auto max-w-7xl 2xl:max-w-[90%] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Tabs */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-1 rounded-full border border-[#51A2FF] p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)] backdrop-blur-sm ">
              <button
                onClick={() => setActiveTab("blog")}
                className={`rounded-full px-4 2xl:px-8 py-2 text-xs sm:text-sm 2xl:text-lg font-medium transition-all ${
                  activeTab === "blog"
                    ? "bg-[#1A337D] text-white shadow-inner ring-1 ring-white/30"
                    : "text-white    hover:bg-white/10"
                }`}
              >
                blog
              </button>
              <button
                onClick={() => setActiveTab("report")}
                className={`rounded-full px-4 2xl:px-8 py-2 text-xs sm:text-sm 2xl:text-lg font-medium transition-all ${
                  activeTab === "report"
                   ? "bg-[#1A337D] text-white shadow-inner ring-1 ring-white/30"
                    : "text-white    hover:bg-white/10"
                }`}
              >
                Report
              </button>
              <button
                onClick={() => setActiveTab("news")}
                className={`rounded-full px-4 2xl:px-8 py-2 text-xs sm:text-sm 2xl:text-lg font-medium transition-all ${
                  activeTab === "news"
                    ? "bg-[#1A337D] text-white shadow-inner ring-1 ring-white/30"
                    : "text-white    hover:bg-white/10"
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
          {loading && (
            <div className="text-center text-gray-500">Loading posts...</div>
          )}

          {error && (
            <div className="text-center text-red-500">{error?.message || "Error loading posts"}</div>
          )}

          {!loading && !error && displayedNews.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayedNews.map((post) => (
                <article
                  key={post.id}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link href={`/news?id=${post.id}`} className="block">
                    <div className="relative h-52 sm:h-56 w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        unoptimized
                      />
                    </div>
                    <div className="p-4 sm:p-5">
                      <p className="text-xs sm:text-sm text-blue-600 font-medium">{post.category}</p>
                      <h3 className="mt-1 text-base sm:text-lg 2xl:text-xl font-semibold text-gray-900 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-xs text-gray-500">
                        {formatDate(post.created_at)} / {getReadingTime(post.content)}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}

          {!loading && !error && filteredNews.length === 0 && (
            <div className="text-center text-gray-500">No posts found for this category.</div>
          )}

          {/* See more button - only show if there are more than 6 posts and not all are shown */}
          {!loading && !error && hasMorePosts && !showAll && (
            <div className="mt-10 flex justify-center">
              <button 
                onClick={() => setShowAll(true)}
                className="rounded-full bg-white px-6 py-2 text-sm font-medium text-black border border-black hover:bg-gray-50 transition-colors"
              >
                See more
              </button>
            </div>
          )}

          {/* Show less button - only show if all posts are displayed and there are more than 6 */}
          {!loading && !error && hasMorePosts && showAll && (
            <div className="mt-10 flex justify-center">
              <button 
                onClick={() => setShowAll(false)}
                className="rounded-full bg-white px-6 py-2 text-sm font-medium text-black border border-black hover:bg-gray-50 transition-colors"
              >
                Show less
              </button>
            </div>
          )}
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

export default function BlogPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogContent />
    </Suspense>
  );
}


