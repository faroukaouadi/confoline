import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../config/api";

type NewsItem = {
  id: number;
  title: string;
  content: string;
  excerpt?: string;
  image: string;
  category: string;
  link: string;
  is_featured: boolean;
  created_at: string;
};

type NewsResponse = {
  success: boolean;
  data: NewsItem[];
};

const fetchNews = async (): Promise<NewsItem[]> => {
  const apiUrl = getApiUrl("news");

  const response = await fetch(apiUrl, {
    headers: { "Accept": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const json: NewsResponse = await response.json();
  
  if (!json.success || !Array.isArray(json.data)) {
    throw new Error("Invalid response format");
  }

  return json.data;
};

const fetchNewsById = async (id: number): Promise<NewsItem> => {
  const apiUrl = `${getApiUrl("newsById")}?id=${id}`;

  const response = await fetch(apiUrl, {
    headers: { "Accept": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch news item");
  }

  const json = await response.json();
  
  if (!json.success || !json.data) {
    throw new Error("News item not found");
  }

  return json.data;
};

export const useNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useNewsById = (id: number) => {
  return useQuery({
    queryKey: ["news", id],
    queryFn: () => fetchNewsById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
