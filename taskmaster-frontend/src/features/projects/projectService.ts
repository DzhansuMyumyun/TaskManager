import toast from "react-hot-toast";
import api from "../../api/axios";
import type { CreateProjectDto, Project } from "../../types/project";

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

//Get
export const getProjects = async (userId?: number): Promise<Project[]> => {
  const response = await api.get<any>(`/Projects`, {
    params: { userId }
  });

  return response.data?.Data || response.data?.data || response.data || [];
};

//Create
export const createProject = async (project: CreateProjectDto): Promise<CreateProjectDto> => {
  const response = await api.post<ApiResponse<CreateProjectDto>>("/Projects", project);
  const { data, message, success } = response.data;

  if (success && message) {
    toast.success(message);
  }
  return data;
};

//Update
export const updateProject = async (id: number, data: Partial<Project>) => {
  const response = await api.put<ApiResponse<Project>>(`/Projects/${id}`, {
    ...data,
    id: Number(id),
  });

  if (response.data.success) {
    toast.success(response.data.message || "Updated successfully");
  }

  return response.data.data;
};

//Delete
export const deleteProject = async (id: number): Promise<void> => {
  const response = await api.delete<ApiResponse<null>>(`/Projects/${id}`);

  if (response.data.success) {
    toast.success(response.data.message || "Project deleted");
  }
};
