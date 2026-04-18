import type { Meta, StoryObj } from "@storybook/react";
import TaskCard from "../TaskCard";
import type { Task } from "../../../types/taskTypes";

const meta: Meta = {
  title: "Features/Tasks/TaskGrid",
  component: TaskCard,
};

export default meta;

const upcomingTasks: Task[] = [
  {
    id: 1,
    title: "Refactor Database Context",
    description:
      "Update the OnModelCreating logic to handle SetNull for activities.",
    priority: 2,
    status: 0,
    projectId: 1,
    createdAt: "2026-04-13",
    dueDate: "2026/06/05",
    subTasks: [],
    taskActivities: [],
  },
  {
    id: 2,
    title: "Frontend Storybook Setup",
    description: "Create stories for TaskCard and TaskList components.",
    priority: 1, // Low - Blue Stripe
    status: 0,
    projectId: 1,
    createdAt: "2026-04-13",
    dueDate: "2026/06/05",
    subTasks: [],
    taskActivities: [],
  },
  {
    id: 3,
    title: "Fix CORS Issues",
    description:
      "Ensure the .NET API allows requests from the Vite frontend port 5173.",
    priority: 2,
    status: 0,
    projectId: 1,
    createdAt: "2026-04-13",
    dueDate: "2026/06/05",
    subTasks: [],
    taskActivities: [],
  },
];

const inProgressTasks: Task[] = [
  {
    id: 4,
    title: "Refactor Database Context",
    description:
      "Update the OnModelCreating logic to handle SetNull for activities.",
    priority: 2,
    status: 1,
    projectId: 1,
    createdAt: "2026-04-13",
    dueDate: "2026/06/05",
    subTasks: [],
    taskActivities: [],
  },
  {
    id: 5,
    title: "Frontend Storybook Setup",
    description: "Create stories for TaskCard and TaskList components.",
    priority: 0, // Low - Blue Stripe
    status: 1,
    projectId: 1,
    createdAt: "2026-04-13",
    dueDate: "2026/06/05",
    subTasks: [],
    taskActivities: [],
  },
];

const doneTasks: Task[] = [
  {
    id: 6,
    title: "Refactor Database Context",
    description:
      "Update the OnModelCreating logic to handle SetNull for activities.",
    priority: 0,
    status: 2,
    projectId: 1,
    createdAt: "2026-04-13",
    dueDate: "2026/06/05",
    subTasks: [],
    taskActivities: [],
  },
  {
    id: 7,
    title: "Frontend Storybook Setup",
    description: "Create stories for TaskCard and TaskList components.",
    priority: 1, // Low - Blue Stripe
    status: 2,
    projectId: 1,
    createdAt: "2026-04-13",
    dueDate: "2026/06/05",
    subTasks: [],
    taskActivities: [],
  },
];

export const DashboardView: StoryObj = {
  render: () => (
    <div className="flex gap-6 p-8 bg-slate-50 min-h-screen">
      {/* Upcoming Column */}
      <div className="flex-1 flex flex-col gap-6 p-4 bg-gray-100">
        <h3 className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-slate-300 rounded-full" /> Upcoming
        </h3>
        {upcomingTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={(id) => console.log("Delete", id)}
            onToggle={(id) => console.log("Toggle", id)}
          />
        ))}
      </div>
      {/* In Progress Column */}
      <div className="flex-1 flex flex-col gap-6 p-4 bg-blue-50">
        <h3 className="font-bold text-blue-500 uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" /> In
          Progress
        </h3>
        {inProgressTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={(id) => console.log("Delete", id)}
            onToggle={(id) => console.log("Toggle", id)}
          />
        ))}
      </div>
      {/* Done Column */}
      <div className="flex-1 flex flex-col gap-6 p-4 bg-emerald-50">
        <h3 className="font-bold text-emerald-500 uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full" /> Done
        </h3>
        {doneTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={(id) => console.log("Delete", id)}
            onToggle={(id) => console.log("Toggle", id)}
          />
        ))}{" "}
      </div>
    </div>
  ),
};
