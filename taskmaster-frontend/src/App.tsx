import { useState } from "react";
import { useTasks } from "./features/tasks/useTasks";
import { useTaskMutations } from "./features/tasks/useTaskMutations";
import { ChevronDown, Folder } from "lucide-react";
import { useProjects } from "./features/projects/useProjects";
import TaskList from "./components/tasks/TaskList";
import TaskInfo from "./components/tasks/TaskInfo";
import { Toaster } from 'react-hot-toast';
// @ts-ignore
import logo from './assets/images/logo.png';


export default function App() {

  const [currentProjectId, setCurrentProjectId] = useState<number | undefined>(undefined);
  const { data: projects, isLoading, isError } = useProjects();
  if (!currentProjectId && projects && projects.length > 0) {
    setCurrentProjectId(projects[0].id);
  }

  return (
      <div className="min-h-screen bg-slate-50 py-10 px-4">
        <div className="max-w-[75rem] mx-auto space-y-10">
        <header className="-mb-6 -mt-6 max-w-[75rem] mx-auto flex items-center">
          <img 
            src={logo} 
            alt="Project Manager Logo" 
            className="w-11 h-11 object-contain" 
          />
          <h1 className="text-3xl font-medium text-slate-900">TaskFlow</h1>
<div className="flex items-center gap-2 ml-8 px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-400 transition-colors relative group">
              <Folder size={16} className="text-slate-400" />
              <select 
                value={currentProjectId || ""}
                onChange={(e) => setCurrentProjectId(Number(e.target.value))}
                className="appearance-none bg-transparent text-sm font-semibold text-slate-600 outline-none cursor-pointer pr-8 z-10"
              >
                {isLoading && <option>Loading projects...</option>}
                {isError && <option>Error loading projects</option>}
                {projects?.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 text-slate-400 pointer-events-none group-hover:text-blue-500" />
            </div>
        </header>
        <span className="block w-screen relative left-1/2 right-1/2 -ml-[50vw] border-b border-gray-300"></span>
        <main className="max-w-[75rem] mx-auto">
          {currentProjectId !== undefined && (
            <section>
              <TaskInfo projectId={currentProjectId} />
            </section>
          )}
          <section>
            <Toaster position="bottom-right" />
            <TaskList projectId={currentProjectId} />
          </section>
        </main>
        </div>

      </div>

  );
}