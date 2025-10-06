import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddTask from "../AddTask";
import { vi } from "vitest";
import axiosClient from "../../../axios-client";
import { toast } from "react-toastify";

vi.mock("../../../axios-client");
vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

describe("AddTask Component", () => {
  const handleLoading = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders form fields correctly", () => {
    render(<AddTask handleLoading={handleLoading} />);
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    render(<AddTask handleLoading={handleLoading} />);
    fireEvent.click(screen.getByText(/Add Task/i));

    expect(await screen.findByText(/Title is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Description is required/i)).toBeInTheDocument();
  });

  it("submits form successfully", async () => {
    axiosClient.post.mockResolvedValue({ data: { message: "Task added successfully" } });

    render(<AddTask handleLoading={handleLoading} />);
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: "Test Task" } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: "Some description" } });
    fireEvent.click(screen.getByText(/Add Task/i));

    await waitFor(() => {
      expect(axiosClient.post).toHaveBeenCalledWith("/tasks", {
        Title: "Test Task",
        Description: "Some description",
      });
      expect(toast.success).toHaveBeenCalledWith("Task added successfully!");
      expect(handleLoading).toHaveBeenCalled();
    });
  });
});
