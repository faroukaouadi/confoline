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

type OpportunityResponse = {
  success: boolean;
  data: Opportunity;
};

const fetchOpportunity = async (id: number): Promise<Opportunity> => {
  const apiUrl = getApiUrl("opportunity");

  const response = await fetch(`${apiUrl}?id=${id}`, {
    headers: { "Accept": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch opportunity");
  }

  const json: OpportunityResponse = await response.json();
  
  if (!json.success || !json.data) {
    throw new Error("Invalid response format");
  }

  return json.data;
};

export const useOpportunity = (id: number) => {
  return useQuery({
    queryKey: ["opportunity", id],
    queryFn: () => fetchOpportunity(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!id, // Only run query if id is provided
  });
};
