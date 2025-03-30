import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import CreateTaskModal from "./CreateTaskModal";
import DeleteConfirmationModal from "./DeleteModal"; 

interface TaskCardProps {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  onUpdate: (task: Task) => void;
  onDelete: (id: number) => void;
}

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, title, description, dueDate, onUpdate, onDelete }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(id); 
    setShowDeleteModal(false); 
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false); 
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          <strong>Due:</strong> {new Date(dueDate).toLocaleString()}
        </Card.Text>
        <Button variant="outline-primary" onClick={handleEdit}>
          <Pencil /> Edit
        </Button>
        <Button variant="outline-danger" className="ms-2" onClick={handleDelete}>
          <Trash /> Delete
        </Button>
      </Card.Body>

      <CreateTaskModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        onSave={(updatedTask) => {
          onUpdate({ id, ...updatedTask });
          setShowEditModal(false);
        }}
        isEditMode={true}
        initialTitle={title}
        initialDescription={description}
        initialDueDate={dueDate}
      />

      {/* DeleteConfirmationModal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
      />
    </Card>
  );
};

export default TaskCard;
