import { useTasks } from "./features/tasks/useTasks";
import { useTaskMutations } from "./features/tasks/useTaskMutations";

export default function App() {
  const { data: tasks } = useTasks();
  const { create, remove } = useTaskMutations();

  return (
    <div className="p-10 space-y-4">
      
      <button
        onClick={() =>
          create.mutate({
            title: "New Task",
            description: "Created from UI",
             projectId: 2
          })
        }
        className="bg-green-500 px-4 py-2 rounded text-white"
      >
        Add Task
      </button>

      {tasks?.map((task) => (
        <div key={task.id} className="bg-slate-800 p-4 text-white rounded">
          <h2>{task.title}</h2>

          <button
            onClick={() => remove.mutate(task.id)}
            className="mt-2 bg-red-500 px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}