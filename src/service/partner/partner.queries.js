import { useQuery } from "@tanstack/react-query";
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

export const usePartnerActivities = (filters) => {
  const { status, page, limit } = filters;
  return useQuery({
    queryKey: ["partner-activities", status, page, limit],
    queryFn: () => getPartnerActivities(filters),
    keepPreviousData: true,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
};

export const useCreatePartnerActivity = () => {
  return useMutation({
    mutationFn: (data) => createPartnerActivity(data),
  });
};
