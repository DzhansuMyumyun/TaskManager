import { useTasks } from "../../features/tasks/useTasks";
import { StatCard } from "./StatCard";

export default function TaskInfo({ projectId }: { projectId: number }) {
  // Fetch the tasks dataset for this project
  const { data, isLoading } = useTasks(projectId);
  
  // 1. SAFELY ACQUIRE THE RAW ARRAY FROM THE HOOK
  const projectTasks = Array.isArray(data) ? data : (data as any)?.data || [];

  // 2. COUNTERS: Directly evaluate statuses from the server-filtered dataset
  const completedCount = projectTasks.filter((t: any) => {
    const status = t.Status !== undefined ? t.Status : t.status;
    return Number(status) === 2 || String(status).toLowerCase() === "done";
  }).length;

  const total = projectTasks.length;
  const percentage = total > 0 ? Math.round((completedCount / total) * 100) : 0;
  
  const pendingCount = projectTasks.filter((t: any) => {
    const status = t.Status !== undefined ? t.Status : t.status;
    return Number(status) === 0 || String(status).toLowerCase() === "to do";
  }).length;

  const inProgressCount = projectTasks.filter((t: any) => {
    const status = t.Status !== undefined ? t.Status : t.status;
    return Number(status) === 1 || String(status).toLowerCase() === "in progress";
  }).length;

  const highPriorityCount = projectTasks.filter((t: any) => {
    const priority = t.Priority !== undefined ? t.Priority : t.priority;
    return Number(priority) === 2 || String(priority).toLowerCase() === "urgent" || String(priority).toLowerCase() === "high";
  }).length;

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

      {/* Card 2: To Do */}
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