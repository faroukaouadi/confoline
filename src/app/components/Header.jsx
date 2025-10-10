"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Search, ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useNews } from "../../hooks/useNews";
import { useOpportunities } from "../../hooks/useOpportunities";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyMobileOpen, setCompanyMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();
  
  // Data hooks
  const { data: news = [] } = useNews();
  const { data: opportunities = [] } = useOpportunities();


  // Search functionality
  useEffect(() => {
    if (searchQuery.length > 2) {
      const results = [];
      
      // Static pages data with keywords
      const staticPages = [
        { title: 'Services', url: '/services', category: 'Services', type: 'page', keywords: ['service', 'services'] },
        { title: 'Industries', url: '/industries', category: 'Industries', type: 'page', keywords: ['industry', 'industries', 'sector', 'sectors'] },
        { title: 'Customers', url: '/customers', category: 'Customers', type: 'page', keywords: ['customer', 'customers', 'client', 'clients'] },
        { title: 'Support', url: '/support', category: 'Support', type: 'page', keywords: ['support', 'help', 'assistance'] },
        { title: 'Partners', url: '/partners', category: 'Partners', type: 'page', keywords: ['partner', 'partners', 'collaboration'] },
        { title: 'Company Story', url: '/company', category: 'Company', type: 'page', keywords: ['company', 'about', 'story', 'team'] },
        { title: 'Blogs', url: '/blogs', category: 'Blogs', type: 'page', keywords: ['blog', 'blogs', 'article', 'articles', 'report', 'reports'] },
        { title: 'Career', url: '/career', category: 'Career', type: 'page', keywords: ['career', 'careers', 'job', 'jobs', 'opportunity', 'opportunities', 'employment', 'hiring', 'work'] },
        { title: 'Locations', url: '/locations', category: 'Locations', type: 'page', keywords: ['location', 'locations', 'office', 'offices', 'address'] },
        { title: 'News', url: '/news', category: 'News', type: 'page', keywords: ['news', 'update', 'updates', 'announcement'] }
      ];
      
      // Search in static pages
      staticPages.forEach(page => {
        const query = searchQuery.toLowerCase();
        const titleMatch = page.title.toLowerCase().includes(query);
        const categoryMatch = page.category.toLowerCase().includes(query);
        const keywordMatch = page.keywords.some(keyword => keyword.toLowerCase().includes(query));
        
        if (titleMatch || categoryMatch || keywordMatch) {
          results.push({
            type: 'page',
            title: page.title,
            category: page.category,
            url: page.url
          });
        }
      });
      
      // Search in news
      news.forEach(item => {
        if (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push({
            type: 'news',
            title: item.title,
            category: item.category,
            id: item.id,
            url: `/news?id=${item.id}`
          });
        }
      });
      
      // Search in opportunities
      opportunities.forEach(item => {
        if (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.department.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push({
            type: 'opportunity',
            title: item.title,
            category: item.department,
            id: item.id,
            url: `/career/opportunity?id=${item.id}`
          });
        }
      });
      
      setSearchResults(results.slice(0, 8)); // Increased limit to 8 results
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, news, opportunities]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  const handleResultClick = (url) => {
    router.push(url);
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const navLinkClass = (href) =>
    `hover:text-blue-300 flex items-center gap-1 ${pathname && pathname.startsWith(href) ? "text-blue-300" : ""}`;
  const isActive = (href) => pathname && pathname.startsWith(href);
  const navHref = (href) => (isActive(href) ? "/" : href);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-br from-blue-950 to-blue-900 text-white shadow-md">
      <div className="max-w-[90%] mx-auto flex justify-between items-center p-4 2xl:p-6">
        {/* Logo */}
        <div className="cursor-pointer">
          <Link href="/">           
            <Image src="/images/confoline-logo.png" alt="confoline" width={150} height={40} className="object-contain 2xl:w-44 select-none" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex space-x-6 2xl:space-x-8 font-medium text-sm 2xl:text-[24px]">
          <Link href={navHref("/services")} className={navLinkClass("/services")}>
            Services {isActive("/services") ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </Link>
          <Link href={navHref("/industries")} className={navLinkClass("/industries")}>
            Industries {isActive("/industries") ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </Link>
          <Link href={navHref("/customers")} className={navLinkClass("/customers")}>
            Customers {isActive("/customers") ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </Link>
          <Link href={navHref("/support")} className={navLinkClass("/support")}>
            Support {isActive("/support") ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </Link>
          <Link href={navHref("/partners")} className={navLinkClass("/partners")}>
            Partners {isActive("/partners") ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </Link>
          <div className="relative group cursor-pointer" onMouseEnter={()=>setCompanyOpen(true)} onMouseLeave={()=>setCompanyOpen(false)}>
          <button   className="hover:text-blue-300 flex items-center gap-1 2xl:">
            Company {companyOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          {companyOpen && (
              <div className="absolute left-0 top-full w-35 2xl:w-51 bg-gradient-to-br from-blue-950 to-blue-900 shadow-lg rounded-lg py-2">
                <Link href="/company" className="block px-4 py-2 hover:bg-blue-800 ">
                  Company Story
                </Link>
                <Link href="/blogs" className="block px-4 py-2 hover:bg-blue-800">
                  Blogs
                </Link>
                <Link href="/career" className="block px-4 py-2 hover:bg-blue-800">
                  Career
                </Link>
                <Link href="/locations" className="block px-4 py-2 hover:bg-blue-800">
                  Locations
                </Link>
              </div>
          )}
          </div>
        </nav>
        
        {/* Right side utilities */}
        <div className="hidden lg:flex items-center space-x-4 2xl:space-x-6">
          {/* Search */}
          <div className="relative" ref={searchRef}>
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 sm:p-2 hover:bg-blue-800 rounded-full"
            >
              <Search size={18} className="text-white 2xl:size-7"/>
            </button>
            
            {/* Search dropdown */}
            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <form onSubmit={handleSearchSubmit} className="p-3">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search pages, news, opportunities..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                      autoFocus
                    />
                    <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </form>
                
                {/* Search results */}
                {searchResults.length > 0 && (
                  <div className="border-t border-gray-200">
                    {searchResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleResultClick(result.url)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            result.type === 'news' ? 'bg-blue-100 text-blue-800' : 
                            result.type === 'opportunity' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {result.type === 'news' ? 'News' : 
                             result.type === 'opportunity' ? 'Job' : 
                             'Page'}
                          </span>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{result.title}</div>
                            <div className="text-xs text-gray-500">{result.category}</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                
                {searchQuery.length > 2 && searchResults.length === 0 && (
                  <div className="px-4 py-3 text-gray-500 text-sm text-center">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
          {/* <button className="p-1.5 sm:p-2 hover:bg-blue-800 rounded-full">
            <Globe size={18} className="text-white" />
          </button>
          <button className="text-white hover:text-blue-300 font-medium text-xs sm:text-sm 2xl:text-base">
            Sign In
          </button> */}
          <button className=" w-31 h-11 2xl:w-51 2xl:h-18 bg-[#51A2FF] hover:bg-blue-300 rounded-full font-medium cursor-pointer transition-colors text-sm 2xl:text-[24px]">
            Get Started
          </button>
        </div>

        {/* Mobile menu */}
        <button className="lg:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={28}/> : <Menu size={28}/>}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="lg:hidden bg-gradient-to-br from-blue-950 to-blue-900 px-4 pb-4 space-y-2">
          {/* Mobile search */}
          <div className="py-2">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pages, news, opportunities..."
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70" />
            </form>
            
            {/* Mobile search results */}
            {searchResults.length > 0 && (
              <div className="mt-2 space-y-1">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleResultClick(result.url)}
                    className="w-full text-left px-3 py-2 bg-white/5 hover:bg-white/10 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        result.type === 'news' ? 'bg-blue-500/20 text-blue-300' : 
                        result.type === 'opportunity' ? 'bg-green-500/20 text-green-300' : 
                        'bg-gray-500/20 text-gray-300'
                      }`}>
                        {result.type === 'news' ? 'News' : 
                         result.type === 'opportunity' ? 'Job' : 
                         'Page'}
                      </span>
                      <div>
                        <div className="font-medium text-white text-sm">{result.title}</div>
                        <div className="text-xs text-white/70">{result.category}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <Link href={navHref("/services")} className={`block py-2 ${pathname && pathname.startsWith("/services") ? "text-blue-300" : ""}`} onClick={() => setOpen(!open)}>Services</Link>
          <Link href={navHref("/industries")} className={`block py-2 ${pathname && pathname.startsWith("/industries") ? "text-blue-300" : ""}`} onClick={() => setOpen(!open)}>Industries</Link>
          <Link href={navHref("/customers")} className={`block py-2 ${pathname && pathname.startsWith("/customers") ? "text-blue-300" : ""}`} onClick={() => setOpen(!open)}>Customers</Link>
          <Link href={navHref("/support")} className={`block py-2 ${pathname && pathname.startsWith("/support") ? "text-blue-300" : ""}`} onClick={() => setOpen(!open)}>Support</Link>
          <Link href={navHref("/partners")} className={`block py-2 ${pathname && pathname.startsWith("/partners") ? "text-blue-300" : ""}`} onClick={() => setOpen(!open)}>Partners</Link>
          <div>
      <button
        onClick={() => setCompanyMobileOpen(!companyMobileOpen)}
        className="flex items-center justify-between w-full py-2"
      >
        <span>Company</span>
        {companyMobileOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>

      {companyMobileOpen && (
        <div className="pl-4 space-y-2">
          <Link href="/company" className="block py-1 hover:text-blue-300" onClick={() => {setOpen(!open);setCompanyMobileOpen(false);}}>
            Company Story
          </Link>
          <Link href="/blogs" className="block py-1 hover:text-blue-300" onClick={() => {setOpen(!open);setCompanyMobileOpen(false);}}>
            Blogs
          </Link>
          <Link href="/career" className="block py-1 hover:text-blue-300" onClick={() => {setOpen(!open);setCompanyMobileOpen(false);}}>
            Career
          </Link>
          <Link href="/locations" className="block py-1 hover:text-blue-300" onClick={() => {setOpen(!open);setCompanyMobileOpen(false);}}>
            Locations
          </Link>
          
        </div>
      )}
    </div>
          <button className="w-full mt-3 bg-blue-400 px-6 py-2 rounded-md hover:bg-blue-300 cursor-pointer">
            Get Started
          </button>
        </div>
      )}
    </header>
  );
}
