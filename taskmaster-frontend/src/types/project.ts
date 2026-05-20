import type { Task } from "./taskTypes";

export interface Project{
    id:number;
    userId:number;
    name:string;
    colorHex:string;
    category:number; 
    createdAt: string;
    taskItems: Task[];
}

export interface CreateProjectDto{
    userId:number;
    name:string;
    colorHex:string;
    category:number; 
}