import { useQuery } from "@tanstack/react-query";
import { getPartners } from "./partner.service";

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
