import { useTasks } from "./features/tasks/useTasks";
import { useTaskMutations } from "./features/tasks/useTaskMutations";
import TaskList from "./components/tasks/TaskList";

// export default function App() {
//   const { data: tasks } = useTasks();
//   const { create, remove } = useTaskMutations();

//   return (
//     <div className="p-10 space-y-4">
      
//       <button
//         onClick={() =>
//           create.mutate({
//             title: "New Task",
//             description: "Created from UI",
//              projectId: 2
//           })
//         }
//         className="bg-green-500 px-4 py-2 rounded text-white"
//       >
//         Add Task
//       </button>

//       {tasks?.map((task) => (
//         <div key={task.id} className="bg-slate-800 p-4 text-white rounded">
//           <h2>{task.title}</h2>

//           <button
//             onClick={() => remove.mutate(task.id)}
//             className="mt-2 bg-red-500 px-2 py-1 rounded"
//           >
//             Delete
//           </button>
//         </div>
//       ))}

     
//     </div>
//   );
// }


// 1. Create a client

export default function App() {
  return (
    // 2. Wrap the app with the Provider
      <div className="min-h-screen bg-slate-50 p-8">
        <header className="mb-10 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900">Project Manager</h1>
          <p className="text-slate-500">Manage your tasks and subtasks</p>
        </header>

        <main className="max-w-5xl mx-auto">
          {/* 3. Render your Feature component */}
          <TaskList />
        </main>
      </div>

  );
}