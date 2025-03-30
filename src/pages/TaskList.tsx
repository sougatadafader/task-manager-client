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
  const [isEditMode, setIsEditMode] = useState(false); 
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  };

  const handleAddTask = () => {
    setIsEditMode(false);
    setCurrentTask(null);
    setShowModal(true);
  };

  const handleEditTask = (updatedTask: Task) => {
    fetch(`http://localhost:5000/api/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => res.json())
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
        setShowModal(false);
        fetchTasks();
      })
      .catch((err) => console.error("Error updating task:", err));
  };

  const handleTaskSubmit = (task: { title: string; description: string; due_date: string }) => {
    if (!task.title || !task.description || !task.due_date || new Date(task.due_date).toString() === 'Invalid Date') {
      alert("Please make sure all fields are filled out correctly, and the date is valid.");
      return;
    }
  
    if (isEditMode && currentTask) {
      const updatedTask = { ...task, id: currentTask.id };
      handleEditTask(updatedTask);
    } else {
      fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      })
        .then((res) => res.json())
        .then((newTask) => {
          setTasks((prevTasks) => [...prevTasks, newTask]);
          setShowModal(false);
          fetchTasks();
        })
        .catch((err) => console.error("Error adding task:", err));
    }
  };
  

  const handleDeleteTask = (id: number) => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        fetchTasks();
      })
      .catch((err) => console.error("Error deleting task:", err));
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
        initialDueDate={currentTask?.due_date || ""}
        taskId={isEditMode ? currentTask?.id! : 0}
      />
    </div>
  );
};

export default TaskList;
