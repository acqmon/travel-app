import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getPartners,
  getPartnerActivities,
  createPartnerActivity,
} from "./partner.service";

export const usePartners = (filters) => {
  const { status, page, limit } = filters;
  console.log("hook limit", limit);
  console.log("hook page", page);
  console.log("hook status", status);
  return useQuery({
    queryKey: ["partners", status, page, limit],
    queryFn: () => getPartners(filters),
    keepPreviousData: true,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
};

export const usePartnerActivities = (filters = {}) => {
  const { status = null, page = 1, limit = 10 } = filters;

  return useQuery({
    queryKey: ["partner-activities", status, page, limit],
    queryFn: () => getPartnerActivities({ status, page, limit }),
    keepPreviousData: true,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
};

export const useCreatePartnerActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createPartnerActivity(data),

    onSuccess: () => {
      // Refetch activities list
      queryClient.invalidateQueries({
        queryKey: ["partner-activities"],
      });
    },
  });
};
