import type { Meta, StoryObj } from "@storybook/react";
import TaskInfo from "../TaskInfo";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const meta: Meta<typeof TaskInfo> = {
  title: 'Components/Tasks/TaskInfo',
  component: TaskInfo,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div className="p-10 bg-slate-100 flex justify-center items-center">
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    msw: {
      handlers: [
        http.get('*/api/TaskItems', () => {
          return HttpResponse.json([
            { id: 1, projectId: 2, status: 2 },
            { id: 2, projectId: 2, status: 2 },
            { id: 3, projectId: 2, status: 2 },
            { id: 4, projectId: 2, status: 0 },
            { id: 5, projectId: 2, status: 0 },
          ]);
        }),
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof TaskInfo>;

export const ProjectProgress: Story = {
  args: {
    projectId: 2,
  },
};