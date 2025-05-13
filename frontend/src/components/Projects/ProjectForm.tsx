import { useState, useEffect, type FC } from "react";
import Loader from "../Loader";
import { HiCheck } from "react-icons/hi";

interface ProjectFormProps {
  initialData?: { name: string; description: string; category: string };
  onSubmit: (data: {
    name: string;
    description: string;
    category: string;
  }) => void;
  loading: boolean;
}

const categories = ["Design", "Development", "Marketing"];

const ProjectForm: FC<ProjectFormProps> = ({
  initialData,
  onSubmit,
  loading,
}) => {
  const [name, setName] = useState<string>(initialData?.name || "");
  const [description, setDescription] = useState<string>(
    initialData?.description || ""
  );
  const [category, setCategory] = useState<string>(
    initialData?.category || categories[0]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ name, description, category });
    setName("");
    setDescription("");
    setCategory(categories[0]);
  };

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setCategory(initialData.category || categories[0]);
    }
  }, [initialData]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg w-full max-w-md mx-auto space-y-4 sm:space-y-6 border border-gray-100"
    >
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          {initialData ? "Edit Project" : "Create New Project"}
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mx-auto"></div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <div>
          <label
            htmlFor="name"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-sm sm:text-base"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter project name"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-sm sm:text-base"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            placeholder="Describe your project"
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm sm:text-base font-medium text-gray-700"
          >
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none appearance-none text-sm sm:text-base bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNjYmNiY2IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im03IDE1IDUgNSA1LTUiLz48L3N2Zz4=')] bg-no-repeat bg-[center_right_0.75rem] sm:bg-[center_right_1rem]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 sm:py-3 px-4 rounded-lg cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader size="18px" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <HiCheck className="hidden sm:block" />
            <span>{initialData ? "Update Project" : "Create Project"}</span>
          </>
        )}
      </button>
    </form>
  );
};

export default ProjectForm;
