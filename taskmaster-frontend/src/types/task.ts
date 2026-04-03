export interface Task{
    id: number;
    projectId: number; 
    title: string;
    description:string;
    status:number;
    priority:number;
    dueDate:string;
    createdAt: string;
}