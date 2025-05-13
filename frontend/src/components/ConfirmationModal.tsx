import type { FC } from "react";
import Loader from "./Loader";
import { HiExclamationTriangle } from "react-icons/hi2";
import { HiX } from "react-icons/hi";

type ConfirmationModalProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectId?: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  handleSubmit: () => void;
  title: string;
  message: string;
  confirmText: string;
};

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  setIsOpen,
  setSelectId,
  isLoading,
  handleSubmit,
  title,
  message,
  confirmText,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => {
          setIsOpen(false);
          setSelectId?.("");
        }}
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

        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <HiExclamationTriangle className="h-6 w-6 text-red-600" />
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>

          <div className="mt-2">
            <p className="text-sm text-gray-600">{message}</p>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setSelectId?.("");
              }}
              className="px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2.5 text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed min-w-[100px]"
              disabled={isLoading}
            >
              {isLoading ? <Loader size="20px" /> : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
