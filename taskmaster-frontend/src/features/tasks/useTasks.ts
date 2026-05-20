import { useQuery } from "@tanstack/react-query";
import { getTasks } from "./taskService";

export const useTasks = (projectId: number) => {
  return useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => getTasks(projectId), 
    enabled: !!projectId,
  });
};