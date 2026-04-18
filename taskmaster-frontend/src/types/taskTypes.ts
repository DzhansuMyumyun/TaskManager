import type { SubTask } from "./subTask";
import type { TaskActivity } from "./taskActivity";

export interface Task{
    id: number;
    projectId: number; 
    title: string;
    description:string;
    status:number;
    priority:number;
    dueDate:string;
    createdAt: string;
    subTasks:SubTask[];
    taskActivities: TaskActivity[];
}

export interface CreateTaskDto {
  title: string;
  description: string;
  priority: number;
  status: number;
  projectId: number;
  dueDate: string;
  subTasks: Omit<SubTask, 'id' | 'taskItemId'>[];
}