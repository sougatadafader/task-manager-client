import React, { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import FloatingButton from "../components/CreateTaskButton";
import CreateTaskModal from "../components/CreateTaskModal";
import { BASE_URL } from "../constants/Constants";
import { Task } from "../types/Types";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); 
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch(BASE_URL +"tasks")
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
    fetch(BASE_URL+ `tasks/${updatedTask.id}`, {
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

  const handleTaskSubmit = (task: { title: string; description: string; dueDate: string }) => {
    if (!task.title || !task.description || !task.dueDate || new Date(task.dueDate).toString() === 'Invalid Date') {
      alert("Please make sure all fields are filled out correctly, and the date is valid.");
      return;
    }
  
    if (isEditMode && currentTask) {
      const updatedTask = { ...task, id: currentTask.id };
      handleEditTask(updatedTask);
    } else {
      fetch(BASE_URL+"tasks", {
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
    fetch(BASE_URL + `tasks/${id}`, {
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
    </div>
  );
};

export default TaskList;
