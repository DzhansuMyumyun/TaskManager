import type { Task } from "../../types/taskTypes";
import { memo } from 'react';

interface Props {
  task: Task;
  onDelete: (id:number) => void;
  onToggle: (id:string) => void;
}

const TaskCard = memo(({ task, onDelete, onToggle }: Props) => {

  const priorityStyleColors: Record<number, { label: string, color: string, dot: string }> = {
    0: { label: "Low", color: "bg-emerald-100 text-emerald-600", dot: "bg-emerald-400" },
    1: { label: "Medium", color: "bg-amber-100 text-amber-500", dot: "bg-amber-400" },
    2: { label: "Urgent", color: "bg-rose-200 text-rose-500", dot: "bg-rose-500" },
  };

    const statusStyleColors: Record<number, string> = {
    0: 'bg-gray-400', // To do 
    1: 'bg-blue-500',   // In Progress
    2: 'bg-emerald-400',    // Done
  };

 const priority = priorityStyleColors[task.priority] || priorityStyleColors[1];
 const allSubtasks = task.subTasks.length;
 const subtaskComplete = task.subTasks.filter(s => s.isCompleted === true).length;

  return (
    <div 
      onClick={() => onToggle(task.id.toString())} 
      className="group cursor-pointer relative overflow-hidden bg-white/60 backdrop-blur-md border border-white/40 p-5 rounded-2xl shadow-sm transition-all hover:shadow-md hover:bg-white/80"
    >      
      {/* Priority Indicator Line */}
      <div className={`absolute left-0 top-0 h-full w-1.5 ${statusStyleColors[task.status] || 'bg-slate-200'}`} />
      
      <div className="flex justify-between items-start pl-2">
        <div className="flex-1">
          <h2 className="font-bold text-slate-800 text-base leading-tight group-hover:text-blue-600 transition-colors">
            {task.title}
          </h2>
          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            {task.description}
          </p>
          <p className="text-xs text-slate-500 pt-5 mt-1.5 line-clamp-2 leading-relaxed">
            ✔ {subtaskComplete}/{allSubtasks} subtasks completed
          </p>
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation(); 
            onDelete(task.id);
          }}
          className="ml-2 p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-all"
          aria-label="Delete task"
        >
          <span className="text-xs">🗑️</span>
        </button>
      </div>
      
      <div className="mt-5 flex items-center justify-between pl-2">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${priority.color}`}>
          <span className={`w-1 h-1 rounded-full ${priority.dot}`} />
          {priority.label}
        </span>

        {/* Placeholder for Date or Subtasks */}
        <span className="text-[10px] font-medium text-slate-400 italic">
          {task.dueDate ? `Due ${task.dueDate}` : ''}
        </span>
      </div>
    </div>
  );
});
export default TaskCard;



