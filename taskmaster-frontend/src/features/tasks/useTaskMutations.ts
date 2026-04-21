import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, updateTask } from "./taskService";
import type { Task, CreateTaskDto } from "../../types/taskTypes";
import axios from "axios";

export const useTaskMutations = () => {
  const queryClient = useQueryClient();

const create = useMutation({
    mutationFn: (data: CreateTaskDto) => createTask(data), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Task> }) =>
      updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateStatus = useMutation({
    mutationFn: ({ taskId, newStatus }: { taskId: number; newStatus: number }) => 
      axios.patch(`/api/TaskItems/${taskId}`, { status: newStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  const remove = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return { create, update, remove };
};