import type { Task } from "../../types/taskTypes";

interface Props {
  task: Task;
  onDelete: (id:number) => void;
  onToggle: (id:string) => void;
}

export default function TaskCard({ task ,onDelete}: Props) {
  return (
<div className="relative overflow-hidden bg-white/40 backdrop-blur-md border border-white/30 p-5 rounded-2xl shadow-sm transition-all hover:bg-white/50">
      {/* Small Priority Indicator (The "Unique" Stripe) */}
      <div className={`absolute left-0 top-0 h-full w-1 ${
        task.priority === 2 ? 'bg-red-400' : 'bg-blue-400'
      }`} />

      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-slate-800 text-lg leading-tight">{task.title}</h2>
          <p className="text-sm text-slate-500 mt-1">{task.description}</p>
        </div>
        
        {/* CRUD Actions */}
        <div className="flex gap-2">
           <button 
             onClick={() => onDelete?.(task.id)}
             className="p-1.5 hover:bg-red-100 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
           >
             🗑️
           </button>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {task.status}
        </span>
      </div>
    </div>
  );
}
