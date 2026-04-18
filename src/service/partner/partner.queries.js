import { useQuery } from "@tanstack/react-query";
import { getPartners } from "./partner.service";

export const usePartners = (filters) => {
  return useQuery({
    queryKey: ["partners", filters],
    queryFn: () => getPartners(filters),
    keepPreviousData: true,
  });
};
