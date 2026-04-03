import { useEffect, useState } from "react";
import { getTasks } from "./features/tasks/taskService";
import type { Task } from "./features/tasks/taskTypes";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Tasks</h1>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="mb-3 p-4 bg-slate-800 text-white rounded"
        >
          <h2 className="font-bold">{task.title}</h2>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
}