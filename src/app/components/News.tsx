"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type NewsItem = { 
  id: number; 
  title: string; 
  content: string; 
  excerpt?: string; 
  image: string; 
  category: string; 
  link: string; 
  is_featured: boolean; 
};

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const apiUrl = process.env.NODE_ENV === 'development' 
          ? "http://127.0.0.1:8000/admin/confoline-Api/news.php"
          : "/admin/confoline-Api/news.php";
        const res = await fetch(apiUrl, {
          signal: controller.signal,
          headers: { "Accept": "application/json" },
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch news");
        const json = await res.json();
        if (json && json.success && Array.isArray(json.data)) {
          setNews(json.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (e: any) {
        if (e.name !== "AbortError") setError(e.message || "Error loading news");
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, []);

  const featuredNews = news.filter(item => item.is_featured);
  const regularNews = news.filter(item => !item.is_featured);

  return (
    <section className="bg-gradient-to-br from-blue-950 to-blue-900 text-white">
      <div className="max-w-7xl 2xl:max-w-[80%] mx-auto px-4 py-16 2xl:py-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 ">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl  font-bold leading-tight">
              <span className="text-cyan-400 ">Latest</span> news
              <br />
              and innovations
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <button className="bg-blue-400 hover:bg-blue-300 cursor-pointer text-white px-8 py-3 rounded-full font-medium transition-colors 2xl:text-[24px]">View Blogs</button>
            <button className="border-2 border-cyan-300/60 text-white cursor-pointer hover:bg-cyan-300/10 hover:text-white px-8 py-3 rounded-full font-medium transition-colors 2xl:text-[24px]">View Analyst Reports</button>
          </div>
        </div>

        {loading && (
          <div className="text-center text-blue-200">Loading news...</div>
        )}

        {error && (
          <div className="text-center text-red-400">{error}</div>
        )}

        {!loading && !error && news.length > 0 && (
          <div className="grid md:grid-cols-2 md:grid-rows-2 gap-6">
            {/* Featured news (left big card) */}
            {featuredNews.length > 0 && featuredNews[0] && (
              <article className="md:col-span-1 md:row-span-2 rounded-2xl overflow-hidden bg-blue-800">
                <div className="bg-[linear-gradient(180deg,#0C1B46_0%,#0065A1_30.76%,#0C1B46_100%)] h-46 sm:h-56 2xl:h-86 flex justify-center items-center">
                  <img src={featuredNews[0].image} alt={featuredNews[0].title} className="w-10/12 h-9/12 object-cover" />
                </div>
                <div className="p-6 sm:p-8 2xl:p-10 h-full flex flex-col">
                  <span className="text-xs 2xl:text-lg uppercase tracking-widest text-white/70">{featuredNews[0].category}</span>
                  <h3 className="mt-2 text-sm sm:text-xl md:text-2xl 2xl:text-4xl font-semibold">
                    {featuredNews[0].title}
                  </h3>
                  {featuredNews[0].excerpt ? (
                    <div className="mt-3 text-white/80 prose prose-invert max-w-none text-xs lg:text-base 2xl:text-lg" dangerouslySetInnerHTML={{ __html: featuredNews[0].excerpt }} />
                  ) : (
                    <div className="mt-3 text-white/80 prose prose-invert max-w-none text-xs lg:text-base 2xl:text-lg" dangerouslySetInnerHTML={{ __html: featuredNews[0].content }} />
                  )}
                  <div className="pt-4">
                    <Link 
                      href={`/news/${featuredNews[0].id}`}
                      className="text-cyan-300 hover:text-cyan-200 text-xs lg:text-base 2xl:text-lg inline-flex items-center gap-2"
                    >
                      Read more
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            )}

            {/* Regular news cards */}
            {regularNews.slice(0, 2).map((item, index) => (
              <article key={item.id} className="rounded-2xl overflow-hidden bg-blue-800">
                <div className="h-full flex">
                  <div className="w-5/12 h-full flex justify-center items-center bg-[linear-gradient(180deg,#0C1B46_0%,#0065A1_30.76%,#0C1B46_100%)]">
                    <img src={item.image} alt={item.title} className="w-10/12 h-9/12 object-cover" />
                  </div>
                  <div className="p-6 2xl:p-8 h-full flex flex-col flex-1">
                    <span className="text-xs 2xl:text-lg uppercase tracking-widest text-white/70">{item.category}</span>
                    <h3 className="mt-2 text-xs sm:text-lg 2xl:text-3xl font-semibold">
                      {item.title}
                    </h3>
                    {item.excerpt ? (
                      <div className="mt-3 text-white/80 prose prose-invert prose max-w-none text-xs lg:text-base 2xl:text-lg line-clamp-3" dangerouslySetInnerHTML={{ __html: item.excerpt }} />
                    ) : (
                      <div className="mt-3 text-white/80 prose prose-invert text-xs lg:text-base 2xl:text-lg prose max-w-none line-clamp-3" dangerouslySetInnerHTML={{ __html: item.content }} />
                    )}
                    <div className="mt-auto pt-4">
                      <Link 
                        href={`/news/${item.id}`}
                        className="text-cyan-300 hover:text-cyan-200 text-xs lg:text-base 2xl:text-lg inline-flex items-center gap-2"
                      >
                        Read more
                        <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="text-center text-blue-200">No news available.</div>
        )}

        {/* Mobile buttons */}
        <div className="mt-6 flex sm:hidden items-center justify-center gap-3">
          <button className="px-4 py-2 rounded-full bg-cyan-500 text-white hover:bg-cyan-400 transition-colors text-sm font-medium">View Blogs</button>
          <button className="px-4 py-2 rounded-full bg-cyan-500 text-white hover:bg-cyan-400 transition-colors text-sm font-medium">View Analyst Reports</button>
        </div>
      </div>
    </section>
  );
}


