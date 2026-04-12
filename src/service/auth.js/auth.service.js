import apiClient from "@/lib/apiClient";

export const signIn = async (data) => {
  const response = await apiClient.post("auth/sign-in", data);
  return response;
};

export const signOut = async () => {
  const response = await apiClient.post("auth/logout");
  return response;
};

export const registerPartner = async (data) => {
  const response = await apiClient.post("auth/sign-up", data);
  return response;
};

export const registerCustomer = async (data) => {
  const response = await apiClient.post("auth/sign-up", data);
  return response;
};
