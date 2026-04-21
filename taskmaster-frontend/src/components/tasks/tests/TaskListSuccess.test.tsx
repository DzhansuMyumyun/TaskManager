import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TaskList from '../TaskList';
import { useTasks } from '../../../features/tasks/useTasks';

vi.mock('../../../features/tasks/useTasks');

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

// Sample mock data matching your Task interface
const mockTasks = [
  { id: 1, title: 'Finish Frontend', status: 0, priority: 'Urgent', description: 'Design implementation', subtasks:[] },
  { id: 2, title: 'Fix API Bug', status: 1, priority: 'Medium', description: 'Check 400 errors', subtasks:[] },
];

describe('TaskList Success State', () => {
  it('renders tasks in their respective columns', () => {
    (useTasks as any).mockReturnValue({
      data: mockTasks,
      isLoading: false,
      isError: false
    });

    render(
      <QueryClientProvider client={queryClient}>
        <TaskList />
      </QueryClientProvider>
    );

    // Verify task titles are in the document
    expect(screen.getByText('Finish Frontend')).toBeInTheDocument();
    expect(screen.getByText('Fix API Bug')).toBeInTheDocument();
    
    // Verify specific priority badges are rendered
    expect(screen.getByText(/URGENT/i)).toBeInTheDocument();
  });
});