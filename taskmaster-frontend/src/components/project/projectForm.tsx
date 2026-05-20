import { useState } from "react";
import { useProjectMutations } from "../../features/projects/useProjectMutations";
import type { CreateProjectDto } from "../../types/project";
import toast from "react-hot-toast";

export default function ProjectForm({
    userId,
    onSuccess,

}: {
    userId?: number;
  onSuccess: () => void;
}) {
  const { create } = useProjectMutations(userId);

  const [formData, setFormData] = useState({
    name: "",
    colorHex: "#3b82f6",
    category: 1,
  });

  //Create
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || userId === 0) {
      toast.error("User session expired. Please log in again.");
      return;
    }

    try {
      await create.mutateAsync({
        ...formData,
        userId: userId,
      } as CreateProjectDto);
      setFormData({
        name: "",
        colorHex: "#3b82f6",
        category: 1,
      });
      onSuccess();
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white p-10 shadow-soft"
    >
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Project</h2>
        <p className="text-slate-400 text-sm">Create your project.</p>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Project name"
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Color"
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-400"
          value={formData.colorHex}
          onChange={(e) =>
            setFormData({ ...formData, colorHex: e.target.value })
          }
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-600 mb-1">
          Status
        </label>
        <select
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={formData.category}
          onChange={(e) =>
            setFormData({
              ...formData,
              category: Number(e.target.value),
            })
          }
        >
          <option value={0}>Work</option>
          <option value={1}>Home</option>
          <option value={2}>School</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={create.isPending}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition mt-4"
      >
        {create.isPending ? "Adding..." : "Add Project"}
      </button>
    </form>
  );
}
