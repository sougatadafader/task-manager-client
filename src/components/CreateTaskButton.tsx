import React from "react";

interface CreateTaskButtonProps {
  onClick: () => void;
}

const CreateTaskButton: React.FC<CreateTaskButtonProps> = ({ onClick }) => {
  return (
    <button 
      className="btn btn-primary rounded-circle" 
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "50px",
        height: "50px",
        fontSize: "24px",
      }}
      onClick={onClick}
    >
      +
    </button>
  );
};

export default CreateTaskButton;
