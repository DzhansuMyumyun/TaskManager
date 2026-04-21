import { useTasks } from "./features/tasks/useTasks";
import { useTaskMutations } from "./features/tasks/useTaskMutations";
import TaskList from "./components/tasks/TaskList";
import TaskInfo from "./components/tasks/TaskInfo";
import { Toaster } from 'react-hot-toast';


export default function App() {
  const currentProjectId = 2;

  return (
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="max-w-[70rem] mx-auto space-y-10">
        <header className="mb-10 max-w-[70rem] mx-auto">
          <h1 className="text-3xl font-bold text-slate-900">Project Manager</h1>
          <p className="text-slate-500">Manage your tasks and subtasks</p>
        </header>

        <main className="max-w-[70rem] mx-auto">
          <section className="pb-8">
            <TaskInfo projectId={currentProjectId}/>
          </section>
          <section>
            <Toaster position="bottom-right" />
            <TaskList />
          </section>
        </main>
        </div>

      </div>

  );
}