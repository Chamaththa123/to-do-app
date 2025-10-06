import React from "react";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div>
      <header className="p-4 bg-blue-600 text-white text-xl font-bold">
        header
      </header>
      <main className="p-4">
        <Outlet />
      </main>

      <footer className="p-4 bg-gray-200 text-center">footer</footer>
    </div>
  );
};

export default MainLayout;
