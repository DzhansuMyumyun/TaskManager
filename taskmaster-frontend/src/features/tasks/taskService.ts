import api from "../../api/axios";
import type { Task } from "../../types/taskTypes";

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// GET tasks
export const getTasks = async (): Promise<Task[]> =>{
    const response = await api.get<{ data: Task[] }>("/TaskItems");
    return response.data.data;
}

// GET single task
export const getTaskById = async (id: number): Promise<Task> => {
  const response = await api.get<Task>(`/TaskItems/${id}`);
  return response.data;
}; 

// CREATE task
export const createTask = async (
  task: Partial<Task>
): Promise<Task> => {
  const response = await api.post<Task>("/TaskItems", task);
  return response.data;
};

// UPDATE
export const updateTask = async (
  id: number,
  task: Partial<Task>
): Promise<Task> => {
  const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, task);
  return response.data.data;
};

// DELETE task
export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/TaskItems/${id}`);
};
