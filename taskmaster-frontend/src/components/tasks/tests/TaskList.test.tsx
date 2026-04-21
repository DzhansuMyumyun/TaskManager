import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Add this
import TaskList from '../TaskList';
import { useTasks } from '../../../features/tasks/useTasks';

vi.mock('../../../features/tasks/useTasks');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

describe('TaskList Empty State', () => {
  it('shows "No tasks yet" when a column is empty', () => {
    (useTasks as any).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false
    });

    render(
      <QueryClientProvider client={queryClient}>
        <TaskList />
      </QueryClientProvider>
    );

    const emptyMessages = screen.getAllByText(/No tasks yet/i);
    expect(emptyMessages.length).toBeGreaterThan(0);
  });
});