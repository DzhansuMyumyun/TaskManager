import api from "../../api/axios";
import type { SubTask } from "../../types/subTask";


interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export const getSubTasks = async (): Promise<SubTask[]> =>{
    const response = await api.get<{ data: SubTask[] }>("/SubTasks");
    return response.data.data;
}


export const getSubTaskById = async (id: number): Promise<SubTask> => {
  const response = await api.get<SubTask>(`/SubTasks/${id}`);
  return response.data;
}; 

export const createSubTask = async (subTask: {
  title: string;
  isCompleted: boolean;
  taskItemId: number;
}) => {
  return api.post("/SubTasks", subTask);
};

export const updateSubTask = async (
  id: number,
  subTask: SubTask
): Promise<SubTask> => {
  const response = await api.put<SubTask>(`/SubTasks/${id}`, subTask);
  return response.data;
};


export const deleteSubTask = async (id: number): Promise<void> => {
  await api.delete(`/SubTasks/${id}`);
};
