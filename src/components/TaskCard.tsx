import React from "react";

interface TaskCardProps {
  title: string;
  description: string;
  dueDate: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description, dueDate }) => {
  return (
    <div className="card mb-3 shadow-sm" style={{ width: "100%" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <small className="text-muted">Due: {dueDate}</small>
      </div>
    </div>
  );
};

export default TaskCard;
