import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const handleTaskSubmit = async (task: { title: string; description: string; due_date: string }) => {
    try {
      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });

      if (response.ok) {
        alert("Task created successfully!");
        fetchTasks(); // Refresh the task list
        setShowModal(false);
      } else {
        alert("Error creating task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">My Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} title={task.title} description={task.description} dueDate={task.due_date} />
        ))
      )}
      
      {/* Floating Button to open modal */}
      <FloatingButton onClick={() => setShowModal(true)} />

      {/* Modal for creating tasks */}
      <CreateTaskModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleTaskSubmit}
      />
    </div>
  );
};

export default TaskList;
