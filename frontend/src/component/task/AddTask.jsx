import React, { useState } from "react";
import axiosClient from "../../axios-client";
import { toast } from "react-toastify";

const AddTask = ({ handleLoading }) => {
  const initialFormData = {
    Title: "",
    Description: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.Title.trim()) newErrors.Title = "Title is required";
    if (!formData.Description.trim())
      newErrors.Description = "Description is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const data = await axiosClient.post("/tasks", formData);
      console.log("Task added:", data);
      setFormData(initialFormData);
      handleLoading();
      toast.success("Task added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
              errors.Title
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            placeholder="Enter task Title"
          />
          {errors.Title && (
            <p className="text-red-600 mt-1 text-sm">{errors.Title}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            className={`w-full border rounded-md p-2 focus:outline-none focus:ring-2 ${
              errors.Description
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            rows={4}
            placeholder="Enter task Description"
          />
          {errors.Description && (
            <p className="text-red-600 mt-1 text-sm">{errors.Description}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            {loading ? "Adding..." : "Add Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
