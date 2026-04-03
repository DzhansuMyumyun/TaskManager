import type { Meta, StoryObj } from "@storybook/react";
import TaskCard from "../../../components/tasks/TaskCard";
import type { Task } from "../taskTypes";

const mockTask: Task = {
  id: 1,
  projectId: 1,
  title: "Design UI",
  description: "Create dashboard layout",
  status: 1,
  priority: 2,
  dueDate: "2026-01-01",
  createdAt: "2026-01-01",
};

const meta: Meta<typeof TaskCard> = {
  title: "Tasks/TaskCard",
  component: TaskCard,
};


export default meta;

type Story = StoryObj<typeof TaskCard>;

export const Default: Story = {
  args: {
    task: mockTask,
  },
};