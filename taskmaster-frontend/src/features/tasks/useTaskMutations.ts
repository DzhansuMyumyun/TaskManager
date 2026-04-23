import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, updateTask } from "./taskService";
import type { Task, CreateTaskDto } from "../../types/taskTypes";
import axios from "axios";

export const useTaskMutations = (projectId?: number) => {
  const queryClient = useQueryClient();

const create = useMutation({
    mutationFn: (data: CreateTaskDto) => createTask(data), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Task> }) =>
      updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] }); 
    },

  });


  const remove = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
  });

  return { create, update, remove };
};