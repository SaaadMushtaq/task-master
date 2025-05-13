import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import type { Task } from "../../types";
import { deleteTask, getTasks, reorderTask } from "../../api/task";
import { FiPlus } from "react-icons/fi";
import CreateUpdateTaskModal from "./CreateUpdateTaskModal";
import { TaskCard } from "./TaskCard";

interface TaskBoardProps {
  projectId: string;
}

const statuses: ("todo" | "in-progress" | "done")[] = [
  "todo",
  "in-progress",
  "done",
];

const TaskBoard: React.FC<TaskBoardProps> = ({ projectId }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectId, setSelectId] = useState<string>("");
  const [selectedStatus, setselectedStatus] = useState<
    "todo" | "in-progress" | "done"
  >("todo");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetchTasks = useCallback(async () => {
    const res = await getTasks(projectId);

    setTasks(res);
  }, [projectId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const grouped = useMemo(() => {
    const map: Record<string, Task[]> = {
      todo: [],
      "in-progress": [],
      done: [],
    };
    tasks.forEach((task) => map[task.status].push(task));

    Object.keys(map).forEach((status) => {
      map[status] = map[status].sort((a, b) => a.position - b.position);
    });
    return map;
  }, [tasks]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const originalTasks = [...tasks];
    const movedTask = tasks.find((t) => t._id === draggableId);
    if (!movedTask) return;

    let updatedTasks = [...tasks];

    if (source.droppableId === destination.droppableId) {
      const status = source.droppableId;
      const statusTasks = updatedTasks
        .filter((t) => t.status === status)
        .sort((a, b) => a.position - b.position);

      const newStatusTasks = statusTasks.filter((t) => t._id !== draggableId);
      newStatusTasks.splice(destination.index, 0, movedTask);

      const updatedStatusTasks = newStatusTasks.map((task, index) => ({
        ...task,
        position: index,
      }));

      updatedTasks = updatedTasks
        .filter((t) => t.status !== status)
        .concat(updatedStatusTasks);
    } else {
      const sourceStatus = source.droppableId;
      const destStatus = destination.droppableId;

      const sourceTasks = updatedTasks
        .filter((t) => t.status === sourceStatus)
        .sort((a, b) => a.position - b.position);
      const newSourceTasks = sourceTasks.filter((t) => t._id !== draggableId);
      const updatedSourceTasks = newSourceTasks.map((task, index) => ({
        ...task,
        position: index,
      }));

      const destTasks = updatedTasks
        .filter((t) => t.status === destStatus)
        .sort((a, b) => a.position - b.position);
      const movedTaskUpdated = {
        ...movedTask,
        status: destStatus as "todo" | "in-progress" | "done",
        position: destination.index,
      };
      const newDestTasks = [...destTasks];
      newDestTasks.splice(destination.index, 0, movedTaskUpdated);
      const updatedDestTasks = newDestTasks.map((task, index) => ({
        ...task,
        position: index,
      }));

      updatedTasks = updatedTasks
        .filter((t) => t.status !== sourceStatus && t.status !== destStatus)
        .concat(updatedSourceTasks)
        .concat(updatedDestTasks);
    }

    // Optimistically update the tasks state
    setTasks(updatedTasks);

    try {
      await reorderTask(
        movedTask._id,
        source.droppableId as "todo" | "in-progress" | "done",
        source.index,
        destination.droppableId as "todo" | "in-progress" | "done",
        destination.index
      );
    } catch (err) {
      setTasks(originalTasks);
      console.error("Failed to update task", err);
    }
  };

  const handleOpenCreateUpdateTaskModal = (
    status: "todo" | "in-progress" | "done",
    taskId?: string
  ) => {
    if (taskId) {
      setSelectId(taskId);
    }
    setselectedStatus(status);

    setIsOpen(true);
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statuses.map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  className="bg-gray-100 p-4 rounded min-h-[300px]"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold capitalize mb-2">
                      {status}
                    </h2>

                    <FiPlus
                      onClick={() => handleOpenCreateUpdateTaskModal(status)}
                      className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                      size={24}
                    />
                  </div>
                  {grouped[status].map((task, index) => (
                    <Draggable
                      draggableId={task._id}
                      index={index}
                      key={task._id}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            title={task.title}
                            status={task.status}
                            onEdit={() =>
                              handleOpenCreateUpdateTaskModal(
                                task.status,
                                task._id
                              )
                            }
                            onDelete={() => handleDeleteTask(task._id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      {isOpen && (
        <CreateUpdateTaskModal
          setIsOpen={setIsOpen}
          setSelectId={setSelectId}
          fetchTasks={fetchTasks}
          selectedStatus={selectedStatus}
          taskId={selectId}
          projectId={projectId}
        />
      )}
    </>
  );
};

export default TaskBoard;
