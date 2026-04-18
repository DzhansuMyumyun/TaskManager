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
  const response = await api.post<Task>("/TaskItems", task);
  return response.data;
};

// UPDATE
export const updateTask = async (id: number, data: Partial<Task>) => {
  // We explicitly spread data and ensure the ID is included and is a number
  const response = await api.put(`/TaskItems/${id}`, { 
    ...data, 
    id: Number(id) 
  });
  return response.data;
};

// DELETE task
export const deleteTask = async (id: number): Promise<void> => {
  await api.delete(`/TaskItems/${id}`);
};
