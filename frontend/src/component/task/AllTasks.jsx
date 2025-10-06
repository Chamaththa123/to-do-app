import React, { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";

const AllTasks = ({ taskLoading, handleLoading }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingTask, setUpdatingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [taskLoading]);

  const fetchTasks = async () => {
    setLoading(true);

    try {
      const res = await axiosClient.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  const markCompleted = async (id) => {
    setUpdatingTask(id);
    try {
      await axiosClient.patch(`/tasks/complete/${id}`);
      toast.success("Task Completed successfully!");
      handleLoading();
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark task as completed.");
    } finally {
      setUpdatingTask(null);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading tasks...</div>;

  if (tasks.length === 0)
    return (
      <div className="text-center mt-10 text-gray-500">No tasks found.</div>
    );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Tasks</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.idTask}
            className="p-4 border rounded-md shadow-sm bg-gray-100"
          >
            <h3 className="text-lg font-semibold">{task.Title}</h3>
            <div className="flex justify-between gap-5">
              <p className="text-sm font-medium">{task.Description}</p>
              {task.Status === 0 && (
                <button
                  onClick={() => markCompleted(task.idTask)}
                  disabled={updatingTask === task.idTask}
                  className="bg-blue-500 text-white px-5 py-1 rounded-md hover:bg-blue-600 transition"
                >
                  {updatingTask === task.id ? "Updating..." : "Done"}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTasks;
