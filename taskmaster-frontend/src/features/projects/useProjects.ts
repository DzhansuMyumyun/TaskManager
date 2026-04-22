import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../tasks/taskService";
import type { Task } from "../../types/taskTypes";



export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects() 
  });
};