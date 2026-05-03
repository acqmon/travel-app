import { useQuery } from "@tanstack/react-query";
import { getCustomers, getCustomerActivities } from "./customer.service";

export const useCustomers = (filters) => {
  const { page, limit, search } = filters;
  return useQuery({
    queryKey: ["customers", page, limit, search],
    queryFn: () => getCustomers(filters),
    keepPreviousData: true,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
};

export const useCustomerActivities = (filters = {}) => {
  const { page = 1, limit = 10, ...rest } = filters;

  return useQuery({
    queryKey: ["customer-activities", page, limit, rest],
    queryFn: () => getCustomerActivities({ page, limit, ...rest }),
    keepPreviousData: true,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
};
