import { useQuery } from "react-query";
import api from "../services/api";

export default function useGetRequest(url: string, configs = {}, options = {}) {
  return useQuery({
    ...options,
    queryKey: [url, configs],
    queryFn: () => api.get(url, configs),
  });
}
