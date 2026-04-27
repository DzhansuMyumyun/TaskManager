import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, deleteTask, updateTask } from "./taskService";
import type { Task, CreateTaskDto } from "../../types/taskTypes";
import toast from "react-hot-toast";

export const useTaskMutations = (projectId?: number) => {
  const queryClient = useQueryClient();

  // CREATE
  const create = useMutation({
    mutationFn: (data: CreateTaskDto) => createTask(data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
      //toast.success("Task created");
    },

    onError: () => {
      toast.error("Failed to create task");
    },
  });

  // UPDATE  
  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Task> }) =>
      updateTask(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", projectId] });

      const previousTasks = queryClient.getQueryData<Task[]>([
        "tasks",
        projectId,
      ]);

      // instant UI update
      queryClient.setQueryData<Task[]>(
        ["tasks", projectId],
        (old = []) =>
          old.map((task) =>
            task.id === id ? { ...task, ...data } : task
          )
      );

      return { previousTasks };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(
          ["tasks", projectId],
          context.previousTasks
        );
      }
      toast.error("Failed to update task");
    },


    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
    },
  });

  // DELETE
  const remove = useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", projectId] });
      //toast.success("Task deleted");
    },

    onError: () => {
      toast.error("Failed to delete task");
    },
  });

  return { create, update, remove };
};