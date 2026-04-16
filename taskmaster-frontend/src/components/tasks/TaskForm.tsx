import { useState, useEffect } from "react";
import { useTaskMutations } from "../../features/tasks/useTaskMutations";
import type { SubTask } from "../../types/SubTask";
import type { CreateTaskDto, Task } from "../../types/taskTypes";

// Add initialData to props
export default function TaskForm({
  onSuccess,
  initialData,
}: {
  onSuccess: () => void;
  initialData?: Task | null;
}) {
  const { create, update } = useTaskMutations();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: 1,
    status: 0,
    projectId: 2,
    dueDate: new Date().toISOString().split("T")[0],
    subTasks: [] as Partial<SubTask>[],
  });

  const [subTaskInput, setSubTaskInput] = useState("");

  // Populate form if initialData is provided (Edit Mode)
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority,
        status: initialData.status,
        projectId: initialData.projectId || 2,
        dueDate: initialData.dueDate
          ? initialData.dueDate.split("T")[0]
          : new Date().toISOString().split("T")[0],
        subTasks: initialData.subTasks || [],
      });
    }
  }, [initialData]);

const addSubTask = (e: React.MouseEvent | React.KeyboardEvent) => {
  e.preventDefault(); // Stop form submission
  e.stopPropagation(); // Stop event bubbling
  
  if (!subTaskInput.trim()) return;

  console.log("Adding subtask:", subTaskInput); // Debug log

  setFormData((prev) => ({
    ...prev,
    subTasks: [
      ...prev.subTasks,
      { 
        title: subTaskInput.trim(), 
        isCompleted: false 
      },
    ],
  }));
  
  setSubTaskInput(""); // Clear input
};

  const removeSubTask = (index: number) => {
    setFormData({
      ...formData,
      subTasks: formData.subTasks.filter((_, i) => i !== index),
    });
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
console.log("Submit clicked! InitialData ID:", initialData?.id);
  if (initialData?.id) {
    console.log("Attempting Update with:", formData);
    // EDIT MODE
    // Explicitly type the update object to satisfy Partial<Task>
    const updatePayload: Partial<Task> = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      status: formData.status,
      // The cast 'as SubTask[]' tells TS this is a real list, not a tuple
      subTasks: formData.subTasks as SubTask[]
    };

    update.mutate({ id: initialData.id, data: updatePayload }, {
      onSuccess: () => {
          console.log("Update Successful!");
          onSuccess();
        },
        onError: (err) => {
          console.error("Update Failed:", err);
        }
    });
  } else {
    // CREATE MODE
    const payload: CreateTaskDto = {
      ...formData,
      subTasks: formData.subTasks.map(st => ({
        title: st.title || "",
        isCompleted: st.isCompleted || false
      }))
    };
    create.mutate(payload, {
      onSuccess: () => onSuccess(),
    });
  }
};
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Title
        </label>
        <input
          required
          className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Description
        </label>
        <textarea
          required
          className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px]"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      {/* Status & Priority Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Status
          </label>
          <select
            className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-2 outline-none"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: Number(e.target.value) })
            }
          >
            <option value={0}>Upcoming</option>
            <option value={1}>InProgress</option>
            <option value={2}>Done</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Priority
          </label>
          <select
            className="w-full bg-white/50 border border-slate-200 rounded-xl px-4 py-2 outline-none"
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: Number(e.target.value) })
            }
          >
            <option value={0}>Low</option>
            <option value={1}>Medium</option>
            <option value={2}>Urgent</option>
          </select>
        </div>
      </div>

      {/* Subtasks Section */}
      <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
          Subtasks
        </label>
        <div className="space-y-2 mb-3">
          {formData.subTasks.map((st, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm"
            >
              <input
                type="checkbox"
                checked={st.isCompleted}
                onChange={() => {
                  const updated = [...formData.subTasks];
                  updated[index].isCompleted = !updated[index].isCompleted;
                  setFormData({ ...formData, subTasks: updated });
                }}
                className="w-5 h-5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span
                className={`flex-1 text-sm ${st.isCompleted ? "text-slate-400 line-through" : "text-slate-700 font-medium"}`}
              >
                {st.title}
              </span>
              <button
                type="button"
                onClick={() => removeSubTask(index)}
                className="text-slate-400 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm outline-none"
            placeholder="Add a step..."
            value={subTaskInput}
            onChange={(e) => setSubTaskInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addSubTask(e))
            }
          />
          <button
            type="button"
            onClick={(e) => addSubTask(e)}
            className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold"
          >
            Add
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={create.isPending || update.isPending}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-2xl transition-all shadow-lg shadow-blue-200 disabled:bg-slate-300"
      >
        {create.isPending || update.isPending
          ? "Saving..."
          : initialData
            ? "Update Task"
            : "Create Task"}
      </button>
    </form>
  );
}
