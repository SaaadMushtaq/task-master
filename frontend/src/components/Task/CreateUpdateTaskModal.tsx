import { useCallback, useEffect, useState, type FC } from "react";
import { createTask, getTaskById, updateTask } from "../../api/task";
import Loader from "../Loader";
import { HiX, HiCheck } from "react-icons/hi";

type CreateUpdateTaskModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectId?: React.Dispatch<React.SetStateAction<string>>;
  taskId?: string;
  projectId: string;
  selectedStatus: "todo" | "in-progress" | "done";
  fetchTasks: () => void;
};

const statusOptions = [
  { value: "todo", label: "To Do", color: "bg-gray-200 text-gray-800" },
  {
    value: "in-progress",
    label: "In Progress",
    color: "bg-blue-200 text-blue-800",
  },
  { value: "done", label: "Done", color: "bg-green-200 text-green-800" },
];

const CreateUpdateTaskModal: FC<CreateUpdateTaskModalProps> = ({
  setIsOpen,
  setSelectId,
  taskId,
  projectId,
  selectedStatus,
  fetchTasks,
}) => {
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialData, setInitialData] = useState<{
    title: string;
    status: "todo" | "done" | "in-progress";
    position: number;
  }>({
    title: "",
    status: selectedStatus,
    position: 0,
  });

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      if (taskId) {
        await updateTask(taskId, initialData);
      } else {
        await createTask({
          title: initialData.title,
          status: initialData.status,
          projectId,
        });
      }
      fetchTasks();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  }, [initialData, setIsOpen, taskId, projectId, fetchTasks]);

  const handleFetchTask = useCallback(async (taskId: string) => {
    try {
      setFetchLoading(true);
      const response = await getTaskById(taskId);
      setInitialData({
        title: response.title,
        status: response.status,
        position: response.position,
      });
    } catch (err) {
      console.error("Error fetching task", err);
    } finally {
      setFetchLoading(false);
    }
  }, []);

  useEffect(() => {
    if (taskId) {
      handleFetchTask(taskId);
    }
  }, [taskId, handleFetchTask]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="relative bg-white rounded-xl shadow-2xl p-6 w-full max-w-md transform transition-all">
        <button
          onClick={() => {
            setIsOpen(false);
            setSelectId?.("");
          }}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <HiX className="h-5 w-5 text-gray-500" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {taskId ? "Update Task" : "Create New Task"}
          </h2>
          <div className="w-12 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mt-2"></div>
        </div>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="task-title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              id="task-title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
              value={initialData?.title}
              onChange={(e) =>
                setInitialData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label
              htmlFor="task-status"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Status <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    initialData.status === option.value
                      ? `${option.color} ring-2 ring-offset-2 ring-indigo-500`
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() =>
                    setInitialData((prev) => ({
                      ...prev,
                      status: option.value as "todo" | "in-progress" | "done",
                    }))
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setSelectId?.("");
            }}
            className="px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading || fetchLoading || !initialData.title}
            className="px-5 py-2.5 text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading || fetchLoading ? (
              <Loader />
            ) : (
              <>
                <HiCheck className="h-5 w-5" />
                {taskId ? "Update Task" : "Create Task"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUpdateTaskModal;
