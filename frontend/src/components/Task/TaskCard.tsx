import { useState, useRef, useEffect } from "react";
import { HiDotsVertical, HiPencil, HiTrash } from "react-icons/hi";
import ConfirmationModal from "../ConfirmationModal";

interface TaskCardProps {
  title: string;
  status: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  title,
  status,
  onEdit,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const statusColors = {
    todo: "bg-gray-100 text-gray-800",
    "in-progress": "bg-blue-100 text-blue-800",
    done: "bg-green-100 text-green-800",
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await onDelete();
      setOpenModal(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 cursor-grab group hover:border-indigo-100 mb-4">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-800 text-base truncate">
            {title}
          </h3>
          <span
            className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
              statusColors[status as keyof typeof statusColors] ||
              "bg-gray-100 text-gray-800"
            }`}
          >
            {status}
          </span>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="p-1 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors duration-200 text-gray-500 hover:text-gray-700"
            aria-label="Task actions"
          >
            <HiDotsVertical size={20} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-1 w-40 bg-white rounded-lg shadow-lg z-10 border border-gray-200 overflow-hidden">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit();
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-indigo-50 text-sm font-medium text-gray-700 transition-colors duration-200 flex items-center gap-2"
              >
                <HiPencil className="text-indigo-600" size={16} />
                <span>Edit Task</span>
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setOpenModal(true);
                }}
                className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-sm font-medium text-red-600 transition-colors duration-200 flex items-center gap-2"
              >
                <HiTrash className="text-red-500" size={16} />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {openModal && (
        <ConfirmationModal
          setIsOpen={setOpenModal}
          isLoading={isLoading}
          handleSubmit={handleDelete}
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
          confirmText="Delete Task"
        />
      )}
    </div>
  );
};
