import { useQuery } from "@tanstack/react-query";
import { fetchUniversities } from "../lib/api";
import { University } from "../types";

export const useUniversities = () => {
  return useQuery<University[], Error>({
    queryKey: ["universities"],
    queryFn: fetchUniversities,
    staleTime: 1000 * 60 * 2,
  });
};
