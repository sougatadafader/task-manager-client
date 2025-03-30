import React from "react";

interface TaskCardProps {
  title: string;
  description: string;
  dueDate: string;
}

// Function to convert UTC date to a readable format
const formatDate = (utcDate: string) => {
  if (!utcDate) return "No due date"; // Handle empty dates gracefully
  const date = new Date(utcDate);
  return date.toLocaleString(); // Converts to local time format
};

const TaskCard: React.FC<TaskCardProps> = ({ title, description, dueDate }) => {
  return (
    <div className="card mb-3 shadow-sm" style={{ width: "100%" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <small className="text-muted">Due: {formatDate(dueDate)}</small>
      </div>
    </div>
  );
};

export default TaskCard;
