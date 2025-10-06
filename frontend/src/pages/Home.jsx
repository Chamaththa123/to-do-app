import React, { useState } from "react";
import AddTask from "../component/task/AddTask";
import AllTasks from "../component/task/AllTasks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [taskLoading, setTaskLoading] = useState(false);
  const handleLoading = () => setTaskLoading((pre) => !pre);
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-10 p-4 w-full">
      <div className=" mt-10 p-6 shadow-md rounded-md bg-gray-50">
        <AddTask handleLoading={handleLoading} />
      </div>
      <div className=" mt-10 p-6 shadow-md rounded-md bg-gray-50">
        <AllTasks taskLoading={taskLoading} handleLoading={handleLoading} />
      </div>
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Home;
