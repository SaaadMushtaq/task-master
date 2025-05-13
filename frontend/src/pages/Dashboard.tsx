import { IoAddOutline } from "react-icons/io5";
import ProjectsTable from "../components/Dashboard/ProjectsTable";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types";
import { useEffect, useState } from "react";
import { getProjects } from "../api/project";

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await getProjects();
      setProjects(response);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="w-full flex flex-col gap-4 p-4 sm:gap-6 sm:p-6">
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            My Projects
          </h2>
          {projects.length > 0 && (
            <p className="text-sm text-gray-500 mt-1">
              Showing {projects.length} project
              {projects.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <button
          onClick={() => navigate("/projects/create")}
          className="flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg active:translate-y-0 sm:hover:-translate-y-0.5 w-full sm:w-auto"
        >
          <IoAddOutline className="text-lg" />
          <span className="font-medium text-sm sm:text-base">Add Project</span>
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <ProjectsTable projects={projects} fetchProjects={fetchProjects} />
      )}
    </div>
  );
};

export default Dashboard;
