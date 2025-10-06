import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../config/api";

type GalleryItem = {
  id: number;
  src: string;
  created_at: string;
};

type GalleryResponse = {
  success: boolean;
  data: GalleryItem[];
};

const fetchGallery = async (): Promise<GalleryItem[]> => {
  const apiUrl = getApiUrl("gallery");

  const response = await fetch(apiUrl, {
    headers: { "Accept": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch gallery");
  }

  const json: GalleryResponse = await response.json();
  
  if (!json.success || !Array.isArray(json.data)) {
    throw new Error("Invalid response format");
  }

  return json.data;
};

export const useGallery = () => {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: fetchGallery,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
