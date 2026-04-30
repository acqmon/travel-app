import apiClient from "@/lib/apiClient";

export const getBusinessTypes = async () => {
  const response = await apiClient.get("/master/business-types");
  return response.data;
};

export const getMasterActivities = async () => {
  const response = await apiClient.get("/master/activities");
  return response;
};
