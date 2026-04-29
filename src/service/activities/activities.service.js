import apiClient from "@/lib/apiClient";

export const getActivities = async (filters) => {
  const { page = 1, limit = 10, search = "", ...restFilters } = filters;
  const body = {
    search,
    ...restFilters,
  };
  const response = await apiClient.post(
    `/activities/list?page=${page}&limit=${limit}`,
    body,
  );
  return response;
};
