import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateProjectDto } from "../../types/project";
import { createProject, deleteProject } from "./projectService";
import toast from "react-hot-toast";

export const useProjectMutations = (userId?: number) => {
  const queryClient = useQueryClient();

  //Create 
  const create = useMutation({
    mutationFn: (data: CreateProjectDto) => createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", userId] });
    },
    onError: () => {
      toast.error("Faild to create project");
    },
  });



  //Remove
  const remove = useMutation({
    mutationFn: deleteProject,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects", userId] });
    },

    onError: () => {
      toast.error("Failed to delete project");
    },
  });

  return { create, remove };
};
