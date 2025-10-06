import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="p-6 bg-gray-300 text-center text-sm">
      &copy; {currentYear} - To Do App
    </footer>
  );
};

export default Footer;
