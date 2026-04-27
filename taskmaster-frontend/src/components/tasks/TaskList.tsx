import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import { useTasks } from "../../features/tasks/useTasks";
import { useTaskMutations } from "../../features/tasks/useTaskMutations";
import TaskCard from "./TaskCard";
import { useState } from "react";
import Modal from "../ui/Modal";
import TaskForm from "./TaskForm";
import type { Task } from "../../types/taskTypes";
import { Check } from "lucide-react";

interface TaskListProps {
  projectId?: number;
}

export default function TaskList({ projectId }: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: tasks, isLoading, isError, error } = useTasks(projectId);
  const { remove, update } = useTaskMutations(projectId); // pass projectId for cache handling

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const taskToUpdate = tasks?.find(
      (t) => t.id === Number(draggableId)
    );

    if (!taskToUpdate) return;

    update.mutate({
      id: taskToUpdate.id,
      data: {
        ...taskToUpdate,
        status: Number(destination.droppableId),
      },
    });
  };

  const columns = [
    {
      id: 0,
      title: "To Do",
      bg: "bg-gray-100/50",
      text: "text-slate-400",
      icon: (
        <div className="w-1.5 h-1.5 rounded-full border border-slate-500" />
      ),
      iconBg: "bg-slate-200",
    },
    {
      id: 1,
      title: "In Progress",
      bg: "bg-blue-50/50",
      text: "text-blue-500",
      icon: (
        <div className="w-2 h-2 rounded-full border-t-2 border-r-2 border-blue-500 rotate-45" />
      ),
      iconBg: "bg-blue-100",
    },
    {
      id: 2,
      title: "Done",
      bg: "bg-emerald-50/50",
      text: "text-emerald-500",
      icon: (
        <Check size={10} strokeWidth={4} className="text-emerald-600" />
      ),
      iconBg: "bg-emerald-100",
    },
  ];

  if (isLoading)
    return <div className="text-center py-10">Loading tasks...</div>;

  if (isError)
    return (
      <div className="text-red-500">
        Error: {(error as any).message}
      </div>
    );

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-slate-800">
          My Tasks
        </h2>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-slate-900 text-white px-6 py-2 rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2"
        >
          <span>+</span> Add Task
        </button>
      </div>

      {/* Modal */}
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
          currentProjectId={projectId!}
        />
      </Modal>

      {/* Drag & Drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 p-4 min-h-[70vh]">
          {columns.map((col) => (
            <Droppable
              droppableId={col.id.toString()}
              key={col.id}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 flex flex-col gap-4 p-4 rounded-[24px] transition-colors ${
                    col.bg
                  } ${
                    snapshot.isDraggingOver
                      ? "ring-2 ring-slate-200 ring-inset"
                      : ""
                  }`}
                >
                  {/* Column Header */}
                  <h3 className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center ${col.iconBg}`}
                    >
                      {col.icon}
                    </div>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-[0.12em] ${col.text}`}
                    >
                      {col.title}
                    </span>
                  </h3>

                  {/* Tasks */}
                  <div className="flex flex-col gap-4">
                    {(tasks || [])
                      .filter((task) => task.status === col.id)
                      .map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              onClick={() =>
                                setSelectedTask(task)
                              }
                              className={`transition-transform ${
                                snapshot.isDragging
                                  ? "z-50"
                                  : ""
                              }`}
                            >
                              <TaskCard
                                task={task}
                                onDelete={(id) =>
                                  remove.mutate(id)
                                }
                                onToggle={() => {}}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}

                    {provided.placeholder}

                    {/* Empty state */}
                    {(tasks || []).filter(
                      (t) => t.status === col.id
                    ).length === 0 && (
                      <div className="flex flex-col items-center justify-center py-8 px-4 border-2 border-dashed border-slate-200 rounded-[20px] bg-white/30">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          No tasks yet
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Global empty */}
      {tasks?.length === 0 && (
        <p className="text-center text-slate-400 py-20">
          No tasks found. Start by adding one!
        </p>
      )}
    </div>
  );
}