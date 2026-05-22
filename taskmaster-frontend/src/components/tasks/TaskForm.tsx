import { useState, useEffect } from "react";
import { useTaskMutations } from "../../features/tasks/useTaskMutations";
import {
  createSubTask,
  updateSubTask,
  deleteSubTask,
} from "../../features/subTask/subTaskService";
import type { SubTask } from "../../types/subTask";
import type { CreateTaskDto, Task } from "../../types/taskTypes";
import { useQueryClient } from "@tanstack/react-query";

export default function TaskForm({
  onSuccess,
  initialData,
  currentProjectId,
}: {
  onSuccess: () => void;
  initialData?: Task | null;
  currentProjectId: number;
}) {
  const { create, update } = useTaskMutations();
  const [subTaskInput, setSubTaskInput] = useState("");
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: 1,
    status: 0,
    projectId: currentProjectId,
    dueDate: new Date().toISOString().split("T")[0],
    subTasks: [] as Partial<SubTask>[],
  });


  useEffect(() => {
  if (initialData) {
    const rawData = initialData as any;

    // Direct fix for subtask extraction mapping PascalCase from API payload
    const incomingSubTasks =
      rawData.SubTasks ||
      rawData.subTasks ||
      rawData.subtasks ||
      rawData.Subtasks ||
      [];

    setFormData({
      title: rawData.Title || rawData.title || "",
      description: rawData.Description || rawData.description || "",
      priority:
        rawData.Priority !== undefined
          ? rawData.Priority
          : rawData.priority !== undefined
            ? rawData.priority
            : 1,
      status:
        rawData.Status !== undefined
          ? rawData.Status
          : rawData.status !== undefined
            ? rawData.status
            : 0,
      projectId: rawData.ProjectId || rawData.projectId || currentProjectId,
      dueDate:
        rawData.DueDate || rawData.dueDate
          ? (rawData.DueDate || rawData.dueDate).split("T")[0]
          : new Date().toISOString().split("T")[0],
      // This assigns your existing items safely to the local working state array!
      subTasks: incomingSubTasks,
    });
  } else {
    // Reset form for "Create Mode"
    setFormData({
      title: "",
      description: "",
      priority: 1,
      status: 0,
      projectId: currentProjectId,
      dueDate: new Date().toISOString().split("T")[0],
      subTasks: [],
    });
  }
}, [initialData, currentProjectId]);

  const addSubTask = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (!subTaskInput.trim()) return;

    setFormData((prev) => ({
      ...prev,
      subTasks: [
        ...prev.subTasks,
        {
          title: subTaskInput.trim(),
          isCompleted: false,
        },
      ],
    }));
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
    const rawInitial = initialData as any;
    const taskId =
      rawInitial?.id !== undefined ? rawInitial?.id : rawInitial?.Id;

    try {
      if (taskId) {
        // UPDATE MAIN TASK FIRST (Payload mapping supports backend architecture)
        await update.mutateAsync({
          id: taskId,
          data: {
            id: taskId,
            title: formData.title,
            description: formData.description,
            status: formData.status,
            priority: formData.priority,
            projectId: formData.projectId,
            dueDate: formData.dueDate,
            subTasks: [],
          },
        });

        // HANDLE DELETIONS (Safely extract existing subtask IDs)
        const existingIds = formData.subTasks
          .map((st: any) => (st.id !== undefined ? st.id : st.Id))
          .filter(Boolean);

        const incomingSubTasks =
          rawInitial?.subTasks ||
          rawInitial?.SubTasks ||
          rawInitial?.subtasks ||
          rawInitial?.Subtasks ||
          [];
        const originalIds = incomingSubTasks
          .map((st: any) => (st.id !== undefined ? st.id : st.Id))
          .filter(Boolean);

        const toDelete = originalIds.filter(
          (id: number) => !existingIds.includes(id),
        );
        await Promise.all(toDelete.map((id: number) => deleteSubTask(id)));

        // UPDATE OR CREATE SUBTASKS
        await Promise.all(
          formData.subTasks.map((st: any) => {
            const subTaskId = st.id !== undefined ? st.id : st.Id;
            // Support either naming convention inside the updated object payload
            const subTaskPayload = {
              title: st.title || st.Title || "",
              isCompleted:
                st.isCompleted !== undefined
                  ? st.isCompleted
                  : st.IsCompleted !== undefined
                    ? st.IsCompleted
                    : false,
              taskItemId: taskId,
            };

            return subTaskId
              ? updateSubTask(subTaskId, {
                  ...st,
                  ...subTaskPayload,
                  id: subTaskId,
                } as SubTask)
              : createSubTask({ ...subTaskPayload } as any);
          }),
        );
      } else {
        // CREATE NEW TASK
        const createdTask: any = await create.mutateAsync(
          formData as CreateTaskDto,
        );
        const newTaskId =
          createdTask?.data?.data?.id ||
          createdTask?.data?.id ||
          createdTask?.id ||
          createdTask?.data?.data?.Id ||
          createdTask?.data?.Id ||
          createdTask?.Id;

        if (newTaskId) {
          await Promise.all(
            formData.subTasks.map((st: any) =>
              createSubTask({
                title: st.title || st.Title || "",
                isCompleted:
                  st.isCompleted !== undefined
                    ? st.isCompleted
                    : st.IsCompleted !== undefined
                      ? st.IsCompleted
                      : false,
                taskItemId: Number(newTaskId),
              }),
            ),
          );
        }
      }
      await queryClient.invalidateQueries({
        queryKey: ["tasks", currentProjectId],
      });
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

      {/* Body Content Fields */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {/* Title */}
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

        {/* Subtasks Container */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Subtasks
            </label>
            <span className="text-xs text-slate-400">
              {formData.subTasks.length} items
            </span>
          </div>

          {/* Subtask List Renderer */}
          <div className="space-y-2 mb-4 max-h-40 overflow-y-auto pr-1">
            {/* 🌟 Replace your subtask array map loop with this safely casted version */}
            {formData.subTasks.map((subTaskItem: any, index) => {
              const isChecked =
                subTaskItem.isCompleted !== undefined
                  ? subTaskItem.isCompleted
                  : subTaskItem.IsCompleted !== undefined
                    ? subTaskItem.IsCompleted
                    : false;

              const subTitle = subTaskItem.title || subTaskItem.Title || "";

              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2.5 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                      const updated = [...formData.subTasks].map((item, i) => {
                        if (i !== index) return item;

                        const castedItem = { ...item } as any;
                        // Toggle the value safely on whatever casing exists
                        if (castedItem.isCompleted !== undefined)
                          castedItem.isCompleted = !isChecked;
                        if (castedItem.IsCompleted !== undefined)
                          castedItem.IsCompleted = !isChecked;
                        if (
                          castedItem.isCompleted === undefined &&
                          castedItem.IsCompleted === undefined
                        ) {
                          castedItem.isCompleted = !isChecked;
                        }
                        return castedItem;
                      });

                      setFormData({ ...formData, subTasks: updated });
                    }}
                    className="w-5 h-5 accent-blue-500 cursor-pointer"
                  />

                  <span
                    className={`flex-1 text-sm ${isChecked ? "text-slate-400 line-through" : "text-slate-700"}`}
                  >
                    {subTitle}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeSubTask(index)}
                    className="text-slate-400 hover:text-red-500 transition"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>

          {/* Add Subtask Trigger Inputs */}
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

      {/* Submit Actions Footer Bar */}
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
