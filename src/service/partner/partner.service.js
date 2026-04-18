import apiClient from "@/lib/apiClient";

export const getPartners = async (filters) => {
  const response = await apiClient.post("/partner", filters);
  return response;
};
