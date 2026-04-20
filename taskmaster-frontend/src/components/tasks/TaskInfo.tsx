import { useTasks } from "../../features/tasks/useTasks";
import type { Task } from "../../types/taskTypes";
import { StatCard } from "./StatCard";

export default function TaskStats({ projectId }: { projectId: number }) {
  const { data: allTasks = [], isLoading } = useTasks();

  const projectTasks = allTasks.filter((t: Task) => t.projectId === projectId);
  
  // Calculations
  const completedCount = projectTasks.filter(t => t.status === 2).length;
  const total = projectTasks.length;
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;
  
  const pendingCount = projectTasks.filter(t => t.status === 0).length;
  const inProgressCount = projectTasks.filter(t => t.status === 1).length;
  const highPriorityCount = projectTasks.filter(t => t.priority === 2).length;

  if (isLoading) return <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-pulse h-28" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 w-full">
      {/* Card 1: Completed */}
      <StatCard 
        title="Task Completed" 
        value={completedCount} 
        color="#5EEAD4" 
        percentage={percentage}
        variant="progress"
      />

      {/* Card 2: Pending */}
      <StatCard 
        title="To Do" 
        value={pendingCount} 
        color="#FACC15" 
        variant="dots"
      />

      {/* Card 3: In Progress */}
      <StatCard 
        title="In Progress" 
        value={inProgressCount} 
        color="#60A5FA" 
        variant="chart"
      />

      {/* Card 4: Priority */}
      <StatCard 
        title="Priority Tasks" 
        value={highPriorityCount} 
        color="#F87171" 
        variant="badge"
      />
    </div>
  );
}