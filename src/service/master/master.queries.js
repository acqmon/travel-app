import { useQuery } from "@tanstack/react-query";
import { getBusinessTypes } from "./master.service";

export const useBusinessTypes = () => {
  
  return useQuery({
    queryKey: ["business-types"],
    queryFn: () => getBusinessTypes(),
  });
};
