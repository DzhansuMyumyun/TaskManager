import { useQuery } from "@tanstack/react-query";
import { getTasks } from "./taskService";
import type { Task } from "./taskTypes";

export const useTasks = () =>{
    return useQuery<Task[]>({
        queryKey:["tasks"],
        queryFn: getTasks,
    });
};