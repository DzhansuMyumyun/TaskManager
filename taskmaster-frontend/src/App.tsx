import { useTasks } from "./features/tasks/useTasks";
import { getTasks } from "./features/tasks/taskService";
import type { Task } from "./features/tasks/taskTypes";
import TaskCard from "./components/tasks/TaskCard";


export default function App() {
 const {data:tasks , isLoading, isError} = useTasks();

 if(isLoading) return <p>Loading...</p>
 if(isError) return <p>Error loading tasks</p>;

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Tasks</h1>
        {tasks?.map((task)=>(
          <TaskCard key={task.id} task={task}/>
        ))}
    </div>
  );
}