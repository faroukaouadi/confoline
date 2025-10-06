import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../config/api";

type Partner = {
  id: number;
  name: string;
  src: string;
  link: string;
  created_at: string;
};

type PartnersResponse = {
  success: boolean;
  data: Partner[];
};

const fetchPartners = async (): Promise<Partner[]> => {
  const apiUrl = getApiUrl("partners");

  const response = await fetch(apiUrl, {
    headers: { "Accept": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch partners");
  }

  const json: PartnersResponse = await response.json();
  
  if (!json.success || !Array.isArray(json.data)) {
    throw new Error("Invalid response format");
  }

  return json.data;
};

export const usePartners = () => {
  return useQuery({
    queryKey: ["partners"],
    queryFn: fetchPartners,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
