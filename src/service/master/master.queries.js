import { useQuery } from "@tanstack/react-query";
import { getBusinessTypes, getMasterActivities } from "./master.service";

export const useBusinessTypes = () => {
  return useQuery({
    queryKey: ["business-types"],
    queryFn: () => getBusinessTypes(),
  });
};

export const useMasterActivities = () => {
  return useQuery({
    queryKey: ["master-activities"],
    queryFn: () => getMasterActivities(),
    keepPreviousData: true,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
};
