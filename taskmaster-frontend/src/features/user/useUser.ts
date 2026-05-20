import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./userService";



export const useUser = <T = any>(isEnabled: boolean) => {
  return useQuery<T>({
    queryKey: ["users"],
    queryFn: () => getUsers() as Promise<T>,
    enabled: isEnabled,
  });
};