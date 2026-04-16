import type { Meta, StoryObj } from '@storybook/react';
import TaskCard from '../TaskCard';

const meta:Meta<typeof TaskCard>={
    title: 'Components/Tasks/TaskCard',
    component: TaskCard,
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
type Story = StoryObj<typeof TaskCard>;

export const UpcomingLow: Story = {
  args: {
    task: {
      id: 1,
      title: 'Complete task management',
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

export const InProgressMedium: Story = {
  args: {
    task: {
      id: 2,
      title: 'Setup API connection',
      description: 'Axios integration with the backend.',
      status: 1,
      priority: 1,
      projectId:2,
      createdAt:'2026/05/04',
      dueDate:'2026/06/05',
      subTasks: [],
      taskActivities:[]
    },
  },
};


export const DoneUrgent: Story = {
  args: {
    task: {
      id: 3,
      title: 'Setup API connection',
      description: 'Axios integration with the backend.',
      status: 2,
      priority: 2,
      projectId:2,
      createdAt:'2026/05/04',
      dueDate:'2026/06/05',
      subTasks: [],
      taskActivities:[]
    },
  },
};

