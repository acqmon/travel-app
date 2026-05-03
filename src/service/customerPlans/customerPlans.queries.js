import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCustomerPlans,
  createCustomerPlan,
  updateCustomerPlan,
} from "./customerPlans.service";

export const useCustomerPlans = (filters) => {
  const { search, isActive, page, limit } = filters;

  return useQuery({
    queryKey: ["customer-plans", search, isActive, page, limit],
    queryFn: () => getCustomerPlans(filters),
    keepPreviousData: true,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
};

export const useCreateCustomerPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomerPlan,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customer-plans"],
      });
    },
  });
};

export const useUpdateCustomerPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCustomerPlan,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["customer-plans"],
      });
    },
  });
};
