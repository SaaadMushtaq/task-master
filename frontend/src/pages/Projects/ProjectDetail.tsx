import { useParams } from "react-router-dom";
import TaskBoard from "../../components/Task/TaskBoard";
import { useCallback, useEffect, useState } from "react";
import { getProjectById } from "../../api/project";
import Loader from "../../components/Loader";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();

  const [loading, setLoading] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<{
    name: string;
    description: string;
    category: string;
  }>();

  const fetchProject = useCallback(async (projectId: string) => {
    try {
      setLoading(true);
      const response = await getProjectById(projectId);

      setInitialData({
        name: response.name,
        description: response.description,
        category: response.category,
      });
    } catch (err) {
      console.error("Error fetching project", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (projectId) {
      fetchProject(projectId);
    }
  }, [projectId, fetchProject]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 truncate">
                {initialData?.name}
              </h1>
              <div className="flex items-center gap-2 mt-1 sm:mt-2">
                <span className="inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium bg-indigo-100 text-indigo-800">
                  {initialData?.category}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md p-4 sm:p-6 border border-gray-100">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
              Description
            </h2>
            <p className="text-sm sm:text-base text-gray-600 whitespace-pre-line">
              {initialData?.description || "No description provided"}
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Tasks
            </h2>
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md overflow-hidden border border-gray-100">
              <TaskBoard projectId={projectId ?? ""} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
