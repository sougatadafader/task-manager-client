import React, { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import FloatingButton from "../components/CreateTaskButton";
import CreateTaskModal from "../components/CreateTaskModal";

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Track if it's in edit mode
  const [currentTask, setCurrentTask] = useState<Task | null>(null); // Store the task being edited

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const handleAddTask = () => {
    setIsEditMode(false); // For new task, we set edit mode to false
    setCurrentTask(null); // No task for new task
    setShowModal(true); // Show modal
  };

  const handleEditTask = (id: number, updatedTask: { title: string; description: string; due_date: string }) => {
    // Now handleEditTask takes id and updatedTask as parameters
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then((updatedTaskData) => {
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, ...updatedTaskData } : task
          )
        );
        setShowModal(false);
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  const handleTaskSubmit = (task: { title: string; description: string; due_date: string }) => {
    if (isEditMode && currentTask) {
      // Update the existing task
      handleEditTask(currentTask.id, task);
    } else {
      // Create a new task
      fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })
        .then((res) => res.json())
        .then((newTask) => {
          setTasks([...tasks, newTask]);
          setShowModal(false);
        })
        .catch((err) => console.error("Error adding task:", err));
    }
  };

  const handleEditClick = (task: Task) => {
    setIsEditMode(true); // Set edit mode to true for editing
    setCurrentTask(task); // Set the current task being edited
    setShowModal(true); // Show the modal for editing
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
            dueDate={task.due_date}
            onUpdate={handleEditClick} // Pass handleEditClick to TaskCard
            onDelete={(id) => {
              fetch(`http://localhost:5000/api/tasks/${id}`, {
                method: "DELETE",
              })
                .then(() => setTasks(tasks.filter((task) => task.id !== id)))
                .catch((err) => console.error("Error deleting task:", err));
            }}
          />
        ))
      )}
      <FloatingButton onClick={handleAddTask} />

      {/* CreateTaskModal */}
      <CreateTaskModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        onSave={handleTaskSubmit}
        isEditMode={isEditMode}
        initialTitle={currentTask?.title || ""}
        initialDescription={currentTask?.description || ""}
        initialDueDate={currentTask?.due_date || ""}
      />
    </div>
  );
};

export default TaskList;
