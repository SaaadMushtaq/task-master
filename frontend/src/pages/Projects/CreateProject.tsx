import { useState } from "react";
import ProjectForm from "../../components/Projects/ProjectForm";
import { createProject } from "../../api/project";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateProject = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);

  const handleCreate = async (data: {
    name: string;
    description: string;
    category: string;
  }) => {
    setLoading(true);
    try {
      await createProject(data);
      toast.success("Project created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Error! Failed to create project");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <ProjectForm onSubmit={handleCreate} loading={loading} />
    </div>
  );
};

export default CreateProject;
