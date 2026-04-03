import type { Task } from "../../features/tasks/taskTypes";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  return (
    <div className="bg-slate-800 text-white p-4 rounded shadow">
      <h2 className="font-bold text-lg">{task.title}</h2>
      <p className="text-sm text-gray-400">{task.description}</p>
    </div>
  );
}
