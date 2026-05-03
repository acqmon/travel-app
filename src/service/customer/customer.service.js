import apiClient from "@/lib/apiClient";

export const getCustomers = async (filters) => {
  const response = await apiClient.post("/customer", filters);
  return response;
};

export const getCustomerActivities = async (filters = {}) => {
  const { page = 1, limit = 10, ...restFilters } = filters;

  const response = await apiClient.post(
    `/customer/activities/list?page=${page}&limit=${limit}`,
    restFilters,
  );

  return response;
};
