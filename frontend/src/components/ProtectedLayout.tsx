import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";

const ProtectedLayout: React.FC = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <Header />
      <main className="flex-1 p-2 md:p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;
