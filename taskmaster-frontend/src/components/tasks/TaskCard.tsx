import { type Task } from "../../types/taskTypes";
import { memo } from 'react';

interface Props {
  task: Task;
  onDelete: (id: number) => void;
  onToggle: (id: string) => void;
}

const TaskCard = memo(({ task, onDelete, onToggle }: Props) => {
  // Safe extraction of properties supporting both lowercase and PascalCase formats
  const rawTask = task as any;
  const taskId = rawTask.id !== undefined ? rawTask.id : rawTask.Id;
  const taskTitle = rawTask.title || rawTask.Title || "Untitled Task";
  const taskDescription = rawTask.description || rawTask.Description || "";
  const taskPriority = rawTask.priority !== undefined ? rawTask.priority : (rawTask.Priority !== undefined ? rawTask.Priority : 1);
  const taskStatus = rawTask.status !== undefined ? rawTask.status : (rawTask.Status !== undefined ? rawTask.Status : 0);
  const taskDueDate = rawTask.dueDate || rawTask.DueDate || "";

  // Safe extraction lookup checking every PascalCase/camelCase variation for subtask arrays
  const subTasksArray = rawTask.subTasks || rawTask.SubTasks || rawTask.subtasks || rawTask.Subtasks || [];

  const priorityStyleColors: Record<number, { label: string, color: string, dot: string }> = {
    0: { label: "Low", color: "bg-emerald-100 text-emerald-600", dot: "bg-emerald-400" },
    1: { label: "Medium", color: "bg-amber-100 text-amber-500", dot: "bg-amber-400" },
    2: { label: "Urgent", color: "bg-rose-200 text-rose-500", dot: "bg-rose-500" },
  };

  const statusStyleColors: Record<number, string> = {
    0: 'bg-gray-400',       // To do 
    1: 'bg-blue-500',       // In Progress
    2: 'bg-emerald-400',    // Done
  };

  const priority = priorityStyleColors[taskPriority] || priorityStyleColors[1];
  
  const allSubtasks = subTasksArray.length;
  
  // Safe subtask completion status evaluator checking boolean or status values (e.g., Status === 2)
  const subtaskComplete = subTasksArray.filter((s: any) => {
    const isDone = s.IsCompleted !== undefined ? s.IsCompleted : (s.isCompleted !== undefined ? s.isCompleted : s.completed);
    const subStatus = s.Status !== undefined ? s.Status : s.status;
    
    return isDone === true || String(isDone).toLowerCase() === "true" || Number(subStatus) === 2 || String(subStatus).toLowerCase() === "done";
  }).length;

  return (
    <div 
      onClick={() => onToggle(String(taskId))} 
      className="group cursor-pointer relative overflow-hidden bg-white/60 backdrop-blur-md border border-white/40 p-5 rounded-2xl shadow-sm transition-all hover:shadow-md hover:bg-white/80"
    >      
      {/* Priority Indicator Line */}
      <div className={`absolute left-0 top-0 h-full w-1.5 ${statusStyleColors[taskStatus] || 'bg-slate-200'}`} />
      
      <div className="flex justify-between items-start pl-2">
        <div className="flex-1">
          <h2 className="font-bold text-slate-800 text-base leading-tight group-hover:text-blue-600 transition-colors">
            {taskTitle}
          </h2>
          
          {/* Render description if present */}
          {taskDescription && (
            <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
              {taskDescription}
            </p>
          )}
          
          {/* Render subtask text block if subtasks exist */}
          {allSubtasks > 0 && (
            <p className="text-xs text-slate-500 pt-3 mt-1.5 line-clamp-2 leading-relaxed flex items-center gap-1">
              <span>📋</span> {subtaskComplete}/{allSubtasks} subtasks completed
            </p>
          )}
        </div>
        
        <button 
          onClick={(e) => {
            e.stopPropagation(); 
            onDelete(Number(taskId));
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

        {/* Due Date Indicator */}
        <span className="text-[10px] font-medium text-slate-400 italic">
          {taskDueDate ? `Due ${taskDueDate}` : ''}
        </span>
      </div>
    </div>
  );
});

TaskCard.displayName = "TaskCard";
export default TaskCard;