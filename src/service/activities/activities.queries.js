import { useQuery } from "@tanstack/react-query";
import { getActivities } from "./activities.service";

export const useActivities = (filters = {}) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    categoryId = "",
    isActive = true,
  } = filters;

  return useQuery({
    queryKey: ["activities", page, limit, search, categoryId, isActive],
    queryFn: () => getActivities(filters),
    keepPreviousData: true,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });
};
