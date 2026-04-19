import { useQuery } from "@tanstack/react-query";
import { getPartners } from "./partner.service";

export const usePartners = (filters) => {
  const { status, page, limit } = filters;
  return useQuery({
    queryKey: ["partners", status, page, limit],
    queryFn: () => getPartners(filters),
    keepPreviousData: true,
  });
};
