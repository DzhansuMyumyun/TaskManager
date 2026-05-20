import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../tasks/taskService";



export const useProjects = (isEnabled: boolean, userId?: number) => {
  return useQuery({
    queryKey: ['projects',userId],
    queryFn: () => getProjects(userId),
    enabled: isEnabled && !!userId,
  });
};