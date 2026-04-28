import apiClient from "@/lib/apiClient";

export const getCustomers = async (filters) => {
  const response = await apiClient.post("/customer", filters);
  return response;
};
