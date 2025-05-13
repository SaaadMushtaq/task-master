import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProjectForm from "../../components/Projects/ProjectForm";

import { getProjectById, updateProject } from "../../api/project";
import { toast } from "react-toastify";

const UpdateProject = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<{
    name: string;
    description: string;
    category: string;
  }>();

  const handleUpdate = async (data: {
    name: string;
    description: string;
    category: string;
  }) => {
    setLoading(true);
    try {
      await updateProject(projectId ?? "", data);
      toast.success("Project updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Error! Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  const fetchProject = useCallback(async (projectId: string) => {
    try {
      const response = await getProjectById(projectId);

      setInitialData({
        name: response.name,
        description: response.description,
        category: response.category,
      });
    } catch (err) {
      console.error("Error fetching project", err);
    }
  }, []);

  useEffect(() => {
    if (projectId) {
      fetchProject(projectId);
    }
  }, [projectId, fetchProject]);

  return (
    <div>
      <ProjectForm
        onSubmit={handleUpdate}
        loading={loading}
        initialData={initialData}
      />
    </div>
  );
};

export default UpdateProject;
