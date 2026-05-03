import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPartnerPlans,
  createPartnerPlan,
  updatePartnerPlan,
} from "./partnerPlans.service";  

export const usePartnerPlans = (filters) => {
  const { search, isActive, page, limit } = filters;

  return useQuery({
    queryKey: ["partner-plans", search, isActive, page, limit],
    queryFn: () => getPartnerPlans(filters),
    keepPreviousData: true,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
};

export const useCreatePartnerPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPartnerPlan,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["partner-plans"],
      });
    },
  });
};

export const useUpdatePartnerPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePartnerPlan,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["partner-plans"],
      });
    },
  });
};
