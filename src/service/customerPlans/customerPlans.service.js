import apiClient from "@/lib/apiClient";

export const getCustomerPlans = async (filters) => {
  const { page, limit, ...rest } = filters;

  const response = await apiClient.post(
    `/admin/customer-plans?page=${page}&limit=${limit}`,
    rest,
  );

  return response;
};

export const createCustomerPlan = async (data) => {
  const response = await apiClient.post(
    "/admin/customer-plans/create-customer-plan",
    data,
  );

  return response;
};

export const updateCustomerPlan = async ({ id, data }) => {
  const response = await apiClient.put(`/admin/customer-plans/${id}`, data);

  return response;
};
