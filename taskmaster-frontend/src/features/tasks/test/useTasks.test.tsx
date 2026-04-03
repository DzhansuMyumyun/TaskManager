import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTasks } from "../useTasks";
import { getTasks } from "../taskService";
import type { Task } from "../taskTypes";
import { test, expect, vi } from "vitest";


vi.mock("../taskService", () => ({
  getTasks: vi.fn(),
}));

// ✅ Step 2: wrapper also here
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

// mock data
const mockTasks: Task[] = [
  {
    id: 1,
    projectId: 1,
    title: "Test Task",
    description: "Test Desc",
    status: 1,
    priority: 2,
    dueDate: "2026-01-01",
    createdAt: "2026-01-01",
  },
];

test("should fetch tasks successfully", async () => {
  (getTasks as any).mockResolvedValue(mockTasks);

  const { result } = renderHook(() => useTasks(), {
    wrapper: createWrapper(),
  });

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  expect(result.current.data).toEqual(mockTasks);
});