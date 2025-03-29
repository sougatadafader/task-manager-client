import React, { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import FloatingButton from "../components/CreateTaskButton";

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks") // Change URL if needed
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const handleAddTask = () => {
    console.log("Open Add Task Modal"); // Placeholder for future modal
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
      <FloatingButton onClick={handleAddTask} />
    </div>
  );
};

export default TaskList;
