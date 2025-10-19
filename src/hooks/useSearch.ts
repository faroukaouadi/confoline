import { useState, useEffect, useMemo } from 'react';
import { useNews } from './useNews';
import { useOpportunities } from './useOpportunities';

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{
    type: string;
    title: string;
    category: string;
    url: string;
    id?: number;
  }>>([]);
  
  // Data hooks
  const { data: news = [] } = useNews();
  const { data: opportunities = [] } = useOpportunities();

  // Memoize static pages to avoid recreating on every render
  const staticPages = useMemo(() => [
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
  ], []);

  // Search functionality with debouncing
  useEffect(() => {
    if (searchQuery.length <= 2) {
      setSearchResults([]);
      return;
    }

    const results: Array<{
      type: string;
      title: string;
      category: string;
      url: string;
      id?: number;
    }> = [];
    const query = searchQuery.toLowerCase();
    
    // Search in static pages
    staticPages.forEach(page => {
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
    
    // Search in news (only if news data is available)
    if (Array.isArray(news) && news.length > 0) {
      news.forEach(item => {
        if (item.title && item.title.toLowerCase().includes(query) ||
            (item.content && item.content.toLowerCase().includes(query)) ||
            (item.category && item.category.toLowerCase().includes(query))) {
          results.push({
            type: 'news',
            title: item.title,
            category: item.category,
            id: item.id,
            url: `/news?id=${item.id}`
          });
        }
      });
    }
    
    // Search in opportunities (only if opportunities data is available)
    if (Array.isArray(opportunities) && opportunities.length > 0) {
      opportunities.forEach(item => {
        if (item.title && item.title.toLowerCase().includes(query) ||
            (item.description && item.description.toLowerCase().includes(query)) ||
            (item.department && item.department.toLowerCase().includes(query))) {
          results.push({
            type: 'opportunity',
            title: item.title,
            category: item.department,
            id: item.id,
            url: `/career/opportunity?id=${item.id}`
          });
        }
      });
    }
    
    setSearchResults(results.slice(0, 8));
  }, [searchQuery, staticPages, news, opportunities]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults
  };
}
