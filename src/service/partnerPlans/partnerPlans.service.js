import apiClient from "@/lib/apiClient";

export const getPartnerPlans = async (filters) => {
  const { page, limit, ...rest } = filters;

  const response = await apiClient.post(
    `/admin/partner-plans?page=${page}&limit=${limit}`,
    rest,
  );

  return response;
};

export const createPartnerPlan = async (data) => {
  const response = await apiClient.post(
    "/admin/partner-plans/create-partner-plan",
    data,
  );

  return response;
};

export const updatePartnerPlan = async ({ id, data }) => {
  const response = await apiClient.put(`/admin/partner-plans/${id}`, data);

  return response;
};
