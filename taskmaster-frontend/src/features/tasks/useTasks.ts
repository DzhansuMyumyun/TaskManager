import { useQuery } from "@tanstack/react-query";
import { getTasks } from "./taskService";
import type { Task } from "../../types/taskTypes";

export const useTasks = () =>{
    return useQuery<Task[]>({
        queryKey:["tasks"],
        queryFn: getTasks,
    });
};