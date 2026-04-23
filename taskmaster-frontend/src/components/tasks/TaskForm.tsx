import { useState, useEffect } from "react";
import { useTaskMutations } from "../../features/tasks/useTaskMutations";
import { createSubTask, updateSubTask,deleteSubTask } from "../../features/subTask/subTaskService";
import type { SubTask } from "../../types/subTask";
import type { CreateTaskDto, Task } from "../../types/taskTypes";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

export default function TaskForm({
  onSuccess,
  initialData,
  currentProjectId,
}: {
  onSuccess: () => void;
  initialData?: Task | null;
  currentProjectId:number; 
}) {
  const { create, update } = useTaskMutations();
  const [subTaskInput, setSubTaskInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: 1,
    status: 0,
    projectId: currentProjectId,
    dueDate: new Date().toISOString().split("T")[0],
    subTasks: [] as Partial<SubTask>[],
  });



  // Populate form (Edit mode)
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
        subTasks: initialData.subTasks || []
      });
    }else {
      // Reset form for "Create Mode" when switching projects
      setFormData(prev => ({ ...prev, projectId: currentProjectId }));
    }
  }, [initialData,currentProjectId]);


 const addSubTask = (e: React.MouseEvent | React.KeyboardEvent) => {
  e.preventDefault();

  if (!subTaskInput.trim()) return;

  setFormData((prev) => {
    const updated = [
      ...prev.subTasks,
      {
        title: subTaskInput.trim(),
        isCompleted: false,
      },
    ];

    return {
      ...prev,
      subTasks: updated,
    };
  });

  setSubTaskInput("");
};

  const removeSubTask = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      subTasks: prev.subTasks.filter((_, i) => i !== index),
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (initialData?.id) {
        // ✅ 1. UPDATE MAIN TASK FIRST
        await new Promise((resolve, reject) => {
          update.mutate(
            {
              id: initialData.id,
              data: {
                id: initialData.id,
                title: formData.title,
                description: formData.description,
                status: formData.status,
                priority: formData.priority,
                projectId: formData.projectId,
                dueDate: formData.dueDate,
                subTasks: []
              },
            },
            { onSuccess: resolve, onError: reject }
          );
      });


      // ✅ 2. HANDLE DELETIONS
      const existingIds = formData.subTasks.filter(st => st.id).map(st => st.id);
      const originalIds = initialData?.subTasks?.map(st => st.id) || [];
      const toDelete = originalIds.filter(id => !existingIds.includes(id));
      
      await Promise.all(toDelete.map(id => deleteSubTask(id)));


      // ✅ 3. UPSERT REMAINING SUBTASKS (Wait for all to finish)
      await Promise.all(
        formData.subTasks.map((st) => {
          if (st.id) {
            return updateSubTask(st.id, {
              id: st.id,
              title: st.title || "",
              isCompleted: st.isCompleted || false,
              taskItemId: initialData.id!,
            });
          } else {
            return createSubTask({
              title: st.title || "",
              isCompleted: st.isCompleted || false,
              taskItemId: initialData.id!,
            });
          }
        })
      );
    } else {
      // CREATE NEW TASK
        const createdTask: any = await new Promise((resolve, reject) => {
          create.mutate(formData as CreateTaskDto, {
            onSuccess: (data) => resolve(data),
            onError: reject,
          });
        });

        const taskId = createdTask?.data?.data?.id || createdTask?.data?.id || createdTask?.id;

        if (!taskId) throw new Error("Task ID was not returned from API");

        // CREATE SUBTASKS AFTER TASK EXISTS
        if (!taskId) {
        throw new Error("Task ID was not returned from API");
        }
      

        // CREATE SUBTASKS FOR NEW TASK
        await Promise.all(
          formData.subTasks.map((st) =>
            createSubTask({
              title: st.title || "",
              isCompleted: st.isCompleted || false,
              taskItemId: Number(taskId),
            })
          )
        );
      }
      const queryClient = useQueryClient();
      queryClient.invalidateQueries({ queryKey: ["tasks", currentProjectId] });
      onSuccess();
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

return (
  <form
    onSubmit={handleSubmit}
    className="flex flex-col max-h-[90vh] w-full max-w-lg space-y-0 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
  >
    {/* Header */}
    <div className="p-6 border-b border-slate-50">
      <h2 className="text-xl font-bold text-slate-800">
        {initialData ? "Edit Task" : "Create Task"}
      </h2>
      <p className="text-sm text-slate-400">
        Manage your task details and subtasks
      </p>
    </div>

    {/* Title */}
    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
    <div>
      <label className="block text-sm font-semibold text-slate-600 mb-1">
        Title
      </label>
      <input
        required
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition"
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
        placeholder="Enter task title..."
      />
    </div>

    {/* Description */}
    <div>
      <label className="block text-sm font-semibold text-slate-600 mb-1">
        Description
      </label>
      <textarea
        required
        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition min-h-[120px]"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Describe the task..."
      />
    </div>

    {/* Status & Priority */}
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-1">
          Status
        </label>
        <select
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: Number(e.target.value),
            })
          }
        >
          <option value={0}>To Do</option>
          <option value={1}>In Progress</option>
          <option value={2}>Done</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-1">
          Priority
        </label>
        <select
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={formData.priority}
          onChange={(e) =>
            setFormData({
              ...formData,
              priority: Number(e.target.value),
            })
          }
        >
          <option value={0}>Low</option>
          <option value={1}>Medium</option>
          <option value={2}>Urgent</option>
        </select>
      </div>
    </div>

    {/* Subtasks */}
    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Subtasks
        </label>
        <span className="text-xs text-slate-400">
          {formData.subTasks.length} items
        </span>
      </div>

      {/* Subtask List */}
      <div className="space-y-2 mb-4 max-h-40 overflow-y-auto pr-1">
        {formData.subTasks.map((st, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition"
          >
            <input
              type="checkbox"
              checked={st.isCompleted}
              onChange={() => {
                const updated = [...formData.subTasks];
                updated[index].isCompleted = !updated[index].isCompleted;
                setFormData({ ...formData, subTasks: updated });
              }}
              className="w-5 h-5 accent-blue-500 cursor-pointer"
            />

            <span
              className={`flex-1 text-sm ${
                st.isCompleted
                  ? "text-slate-400 line-through"
                  : "text-slate-700"
              }`}
            >
              {st.title}
            </span>

            <button
              type="button"
              onClick={() => removeSubTask(index)}
              className="text-slate-400 hover:text-red-500 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Add Subtask */}
      <div className="flex gap-2">
        <input
          className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add a subtask..."
          value={subTaskInput}
          onChange={(e) => setSubTaskInput(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), addSubTask(e))
          }
        />

        <button
          type="button"
          onClick={(e) => addSubTask(e)}
          className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Add
        </button>
      </div>
    </div>
    </div>


    {/* Submit */}
    <div className="p-6 bg-white border-t border-slate-50">
    <button
      type="submit"
      disabled={create.isPending || update.isPending}
      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-2xl transition-all shadow-md disabled:opacity-60"
    >
      {create.isPending || update.isPending
        ? "Saving..."
        : initialData
        ? "Update Task"
        : "Create Task"}
    </button>
    </div>

  </form>
);
}