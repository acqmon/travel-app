import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "./customer.service";

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
