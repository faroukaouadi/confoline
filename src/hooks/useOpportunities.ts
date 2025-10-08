import { useQuery } from "@tanstack/react-query";
import { getApiUrl } from "../config/api";

type Opportunity = {
  id: number;
  title: string;
  department: string;
  location: string;
  work_type: string;
  status: string;
  description: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  salary_range: string;
  experience_level: string;
  posted_date: string;
  application_deadline: string;
  created_at: string;
  updated_at: string;
};

type OpportunitiesResponse = {
  success: boolean;
  data: Opportunity[];
  count: number;
};

const fetchOpportunities = async (): Promise<Opportunity[]> => {
  const apiUrl = getApiUrl("opportunities");
  console.log("Fetching opportunities from:", apiUrl);

  // Fallback to direct URL if needed
  const fallbackUrl = "http://127.0.0.1:8000/admin/confoline-Api/opportunities.php";
  const finalUrl = apiUrl.includes('http') ? apiUrl : fallbackUrl;
  console.log("Using URL:", finalUrl);

  const response = await fetch(finalUrl, {
    headers: { "Accept": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch opportunities");
  }

  const json: OpportunitiesResponse = await response.json();
  
  if (!json.success || !Array.isArray(json.data)) {
    throw new Error("Invalid response format");
  }

  return json.data;
};

export const useOpportunities = () => {
  return useQuery({
    queryKey: ["opportunities"],
    queryFn: fetchOpportunities,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
