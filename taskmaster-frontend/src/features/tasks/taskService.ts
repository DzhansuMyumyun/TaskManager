import toast from "react-hot-toast";
import api from "../../api/axios";
import type { CreateTaskDto, Task } from "../../types/taskTypes";


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
  task: CreateTaskDto
): Promise<Task> => {
  const response = await api.post<ApiResponse<Task>>("/TaskItems", task);
  const { data, message, success } = response.data;

  if (success && message) {
    toast.success(message);
  }
  return data;
};

// UPDATE
export const updateTask = async (id: number, data: Partial<Task>) => {
  const response = await api.put<ApiResponse<Task>>(`/TaskItems/${id}`, { 
    ...data, 
    id: Number(id) 
  });

  if (response.data.success) {
    toast.success(response.data.message || "Updated successfully");
  }

  return response.data.data;
};

// DELETE task
export const deleteTask = async (id: number): Promise<void> => {
  const response = await api.delete<ApiResponse<null>>(`/TaskItems/${id}`);
  
  if (response.data.success) {
    toast.success(response.data.message || "Task deleted");
  }
};
