import { useMutation } from "react-query";
import api from "../services/api";

export default function usePostRequest(url: string, options = {}) {
  return useMutation((args: any) => {
    const { config = {}, ...data } = args ?? {};

    return api.post(url, data, config);
  }, options);
}
