import React, { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import FloatingButton from "../components/CreateTaskButton";
import CreateTaskModal from "../components/CreateTaskModal";
import { BASE_URL } from "../constants/Constants";
import { Task } from "../types/Types";
import ToastMessage from "../components/ToastMessage";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [toast, setToast] = useState({ show: false, message: "", bg: "danger" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${BASE_URL}tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setToast({
        show: true,
        message: "Error fetching tasks. Please try again.",
        bg: "danger",
      });
    }
  };
  

  const handleAddTask = () => {
    setIsEditMode(false);
    setCurrentTask(null);
    setShowModal(true);
  };

  const handleEditTask = async (updatedTask: Task) => {
    try {
      const res = await fetch(`${BASE_URL}tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
  
      if (!res.ok) throw new Error("Failed to update task");
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
  
      setShowModal(false);
      setToast({
        show: true,
        message: "Task updated successfully!",
        bg: "success",
      });
    } catch (err) {
      setToast({
        show: true,
        message: "Error updating task",
        bg: "danger",
      });
    }
  };
  

  const handleTaskSubmit = async (task: {
    title: string;
    description: string;
    dueDate: string;
  }) => {
    if (isEditMode && currentTask) {
      const updatedTask = { ...task, id: currentTask.id };
      await handleEditTask(updatedTask);
    } else {
      try {
        const res = await fetch(`${BASE_URL}tasks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        });

        const newTask = await res.json();
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setShowModal(false);
        setToast({
          show: true,
          message: "Task added successfully!",
          bg: "success"
        });
      } catch (err) {
        setToast({
          show: true,
          message: "Error adding task",
          bg: "danger",
        });
      }
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const res = await fetch(`${BASE_URL}tasks/${id}`, {
        method: "DELETE",
      });
  
      if (!res.ok) throw new Error("Failed to delete task");
  
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));

      setToast({
        show: true,
        message: "Task deleted successfully!",
        bg: "success",
      });
    } catch (err) {
      setToast({
        show: true,
        message: "Error deleting task. Please try again.",
        bg: "danger",
      });
    }
  };
  
  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
            onUpdate={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))
      )}
      <FloatingButton onClick={handleAddTask} />

      <CreateTaskModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSave={handleTaskSubmit}
        isEditMode={isEditMode}
        initialTitle={currentTask?.title || ""}
        initialDescription={currentTask?.description || ""}
        initialDueDate={currentTask?.dueDate || ""}
        taskId={isEditMode ? currentTask?.id! : 0}
      />
      <ToastMessage
        show={toast.show}
        message={toast.message}
        bg={toast.bg}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default TaskList;
