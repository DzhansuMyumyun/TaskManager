import type { Meta, StoryObj } from "@storybook/react";
import TaskInfo from "../TaskInfo";

const meta:Meta<typeof TaskInfo>={
    title: 'Components/Tasks/TaskInfo',
    component: TaskInfo,
    //"Glass" effect
    decorators: [
    (Story) => (
      <div className="p-10 bg-gradient-to-br from-purple-100 to-blue-100 min-h-[300px] rounded-xl">
        <div className="max-w-sm mx-auto">
          <Story />
        </div>
      </div>
    ),
  ],
}

export default meta;
type Story = StoryObj<typeof TaskInfo>;
export const UpcomingLow: Story = {
  args: {
    task: {
      id: 1,
      title: 'Task Completed',
      description: 'Finish the CRUD operations and Storybook setup.',
      status: 0,
      priority: 0,
      projectId:2,
      createdAt:'2026/05/04',
      dueDate:'2026/06/05',
      subTasks: [],
      taskActivities:[]

    },
  },
};