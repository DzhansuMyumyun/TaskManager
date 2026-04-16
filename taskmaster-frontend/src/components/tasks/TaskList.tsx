import { useTasks } from "../../features/tasks/useTasks";
import { useTaskMutations } from "../../features/tasks/useTaskMutations";
import TaskCard from "./TaskCard";
import { useState } from "react";
import Modal from "../ui/Modal";
import TaskForm from "./TaskForm";
import type { Task } from "../../types/taskTypes";

export default function TaskList() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: tasks, isLoading, isError, error } = useTasks();
  const { remove } = useTaskMutations();

  if (isLoading)
    return <div className="text-center py-10">Loading tasks...</div>;
  if (isError)
    return <div className="text-red-500">Error: {(error as any).message}</div>;

  const renderColumn = (statusId: number) => {
    return tasks
      ?.filter((task) => task.status === statusId) 
      .map((task) => (
        <div 
        key={task.id} 
        onClick={() => setSelectedTask(task)} 
        className="cursor-pointer"
        >

          <TaskCard
            key={task.id}
            task={task}
            onDelete={(id) => remove.mutate(id)}
            onToggle={(id) => console.log("Toggle status for", id)}
          />
        </div>
        ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-slate-800">My Tasks</h2>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-6 py-2 rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2"
        >
          <span>+</span> Add Task
        </button>
      </div>
      <Modal
        isOpen={isModalOpen || !!selectedTask}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        title={selectedTask ? "Edit Task" : "New Task"}
      >
        <TaskForm 
          initialData={selectedTask} 
          onSuccess={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }} 
        />
      </Modal>

      <div className="flex gap-6 p-8 bg-slate-50 min-h-screen">
        {/* Upcoming Column */}
        <div className="flex-1 flex flex-col gap-6 p-4 bg-gray-100">
          <h3 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-slate-300 rounded-full" /> Upcoming
          </h3>
          {renderColumn(0)}
        </div>
        {/* In Progress Column */}
        <div className="flex-1 flex flex-col gap-6 p-4 bg-blue-50">
          <h3 className="font-bold text-blue-500 uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />{" "}
            In Progress
          </h3>
          {renderColumn(1)}
        </div>

        {/* Done Column */}
        <div className="flex-1 flex flex-col gap-6 p-4 bg-emerald-50">
          <h3 className="font-bold text-emerald-500 uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" /> Done
          </h3>
          {renderColumn(2)}
          
        </div>


        {tasks?.length === 0 && (
          <p className="col-span-full text-center text-slate-400 py-20">
            No tasks found. Start by adding one!
          </p>
        )}
      </div>
      
    </div>
  );
}
