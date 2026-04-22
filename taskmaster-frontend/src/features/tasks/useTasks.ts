import { useQuery } from "@tanstack/react-query";
import { getTasks } from "./taskService";
import type { Task } from "../../types/taskTypes";

export const useTasks = (projectId?: number) =>{
    return useQuery<Task[]>({
    queryKey: ['tasks', projectId],
    queryFn: () => getTasks(projectId),
    });
};