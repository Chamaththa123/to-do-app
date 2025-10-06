import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import AllTasks from "../AllTasks";
import axiosClient from "../../../axios-client";
import { vi } from "vitest";
import { toast } from "react-toastify";

vi.mock("../../../axios-client");
vi.mock("react-toastify", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

describe("AllTasks Component", () => {
  const handleLoading = vi.fn();

  it("shows loading text initially", () => {
    render(<AllTasks taskLoading={false} handleLoading={handleLoading} />);
    expect(screen.getByText(/Loading tasks.../i)).toBeInTheDocument();
  });

  it("renders task list after fetch", async () => {
    axiosClient.get.mockResolvedValue({
      data: [{ idTask: 1, Title: "Test Task", Description: "Test Desc", Status: 0 }],
    });

    render(<AllTasks taskLoading={false} handleLoading={handleLoading} />);

    await waitFor(() => {
      expect(screen.getByText("Test Task")).toBeInTheDocument();
      expect(screen.getByText("Test Desc")).toBeInTheDocument();
    });
  });

  it("marks a task as completed", async () => {
    axiosClient.get.mockResolvedValue({
      data: [{ idTask: 1, Title: "Task", Description: "Desc", Status: 0 }],
    });
    axiosClient.patch.mockResolvedValue({});

    render(<AllTasks taskLoading={false} handleLoading={handleLoading} />);

    await waitFor(() => screen.getByText(/Task/i));

    fireEvent.click(screen.getByText(/Done/i));

    await waitFor(() => {
      expect(axiosClient.patch).toHaveBeenCalledWith("/tasks/complete/1");
      expect(toast.success).toHaveBeenCalledWith("Task Completed successfully!");
      expect(handleLoading).toHaveBeenCalled();
    });
  });
});
