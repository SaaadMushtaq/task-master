import { useState, type FC } from "react";
import type { Project } from "../../types";
import { Link } from "react-router-dom";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { deleteProject } from "../../api/project";
import ConfirmationModal from "../ConfirmationModal";
import { toast } from "react-toastify";

const tableHeader = ["Project Name", "Category", "Last Update Time", "Action"];

type ProjectsTableProps = {
  projects: Project[];
  fetchProjects: () => void;
};

const ProjectsTable: FC<ProjectsTableProps> = ({ projects, fetchProjects }) => {
  const [selectId, setSelectId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpenDeleteModal = (id: string) => {
    setSelectId(id);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteProject(selectId);
      await fetchProjects();
      toast.success("Project deleted successfully!");
      setSelectId("");
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Error! Failed to delete project");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Mobile-friendly date format
  const formatMobileDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl shadow-lg">
      <div className="hidden md:block min-w-full overflow-hidden bg-white rounded-lg border border-gray-200">
        <table className="w-full text-sm sm:text-base text-left">
          <thead className="text-xs sm:text-sm uppercase bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <tr>
              {tableHeader.map((header) => (
                <th
                  key={header}
                  scope="col"
                  className="px-6 py-4 font-medium tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td
                  colSpan={tableHeader.length}
                  className="px-6 py-12 text-center text-gray-500 italic bg-gray-50"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    <p className="text-gray-600">
                      No projects found. Start by creating a new project.
                    </p>
                    <Link
                      to="/projects/create"
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
                    >
                      Create Project
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr
                  key={project._id}
                  className="border-b border-gray-200 hover:bg-indigo-50/50 transition-colors duration-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <Link
                      to={`/projects/details/${project._id}`}
                      className="group flex items-center space-x-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-indigo-600 group-hover:bg-indigo-700 transition-colors"></span>
                      <span className="group-hover:text-indigo-700 transition-colors">
                        {project.name}
                      </span>
                    </Link>
                  </th>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatDate(project.updatedAt)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Link
                        to={`/projects/update/${project._id}`}
                        className="p-2 rounded-full hover:bg-indigo-100 transition-colors duration-200 group"
                        title="Edit"
                      >
                        <FaRegEdit
                          className="text-indigo-600 group-hover:text-indigo-800 transition-colors"
                          size={16}
                        />
                      </Link>
                      <button
                        onClick={() => handleOpenDeleteModal(project._id)}
                        className="p-2 rounded-full hover:bg-red-100 transition-colors duration-200 group"
                        title="Delete"
                      >
                        <FaTrashAlt
                          className="text-red-500 group-hover:text-red-700 transition-colors"
                          size={16}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4 p-4">
        {projects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <div className="flex flex-col items-center justify-center space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-gray-600">
                No projects found. Start by creating a new project.
              </p>
              <Link
                to="/projects/create"
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
              >
                Create Project
              </Link>
            </div>
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <Link
                    to={`/projects/details/${project._id}`}
                    className="group flex items-center space-x-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-600 group-hover:bg-indigo-700 transition-colors"></span>
                    <h3 className="font-medium text-gray-900 group-hover:text-indigo-700 transition-colors">
                      {project.name}
                    </h3>
                  </Link>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {project.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatMobileDate(project.updatedAt)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    to={`/projects/update/${project._id}`}
                    className="p-1.5 rounded-full hover:bg-indigo-100 transition-colors duration-200"
                    title="Edit"
                  >
                    <FaRegEdit
                      className="text-indigo-600 hover:text-indigo-800 transition-colors"
                      size={14}
                    />
                  </Link>
                  <button
                    onClick={() => handleOpenDeleteModal(project._id)}
                    className="p-1.5 rounded-full hover:bg-red-100 transition-colors duration-200"
                    title="Delete"
                  >
                    <FaTrashAlt
                      className="text-red-500 hover:text-red-700 transition-colors"
                      size={14}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {isOpen && (
        <ConfirmationModal
          setIsOpen={setIsOpen}
          isLoading={isLoading}
          handleSubmit={handleDelete}
          title="Delete Project"
          message="Are you sure you want to delete this project? This action cannot be undone."
          confirmText="Delete"
        />
      )}
    </div>
  );
};

export default ProjectsTable;
