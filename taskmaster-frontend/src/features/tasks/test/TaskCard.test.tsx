import { render, screen } from "@testing-library/react";
import TaskCard from "../../../components/tasks/TaskCard";
import type { Task } from "../../../types/taskTypes";


const mockTask: Task = {
  id: 1,
  projectId: 1,
  title: "Test Task",
  description: "Test Description",
  status: 1,
  priority: 2,
  dueDate: "2026-01-01",
  createdAt: "2026-01-01",
};

// test("renders task title", () => {
//   render(<TaskCard task={mockTask} />);

//   expect(screen.getByText("Test Task")).toBeInTheDocument();
// }); 