import apiClient from "@/lib/apiClient";

export const getPartners = async (filters) => {
  const response = await apiClient.post("/partner", filters);
  return response;
};

export const getPartnerActivities = async (filters) => {
  const { page, limit } = filters;
  const response = await apiClient.post(
    `/partner/activities?page=${page}&limit=${limit}`,
    filters,
  );
  return response;
};

export const createPartnerActivity = async (data) => {
  const response = await apiClient.post(
    "/partner/activities/create-activity",
    data,
  );
  return response;
};
