import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Pencil, Trash } from "react-bootstrap-icons";
import EditTaskModal from "./EditTaskModal"; // Updated to use the EditTaskModal
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { Task } from "../types/Types";

interface TaskCardProps {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  onUpdate: (updatedTask: Task) => void;
  onDelete: (id: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  dueDate,
  onUpdate,
  onDelete,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEditSave = (updatedTask: Task) => {
    const updatedTaskWithId = { ...updatedTask, id };
    onUpdate(updatedTaskWithId);
    setShowEditModal(false);
  };

  const handleDelete = () => {
    onDelete(id);
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
        <Button variant="outline-primary" onClick={() => setShowEditModal(true)}>
          <Pencil /> Edit
        </Button>
        <Button
          variant="outline-danger"
          className="ms-2"
          onClick={() => setShowDeleteModal(true)}
        >
          <Trash /> Delete
        </Button>
      </Card.Body>

      <EditTaskModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        taskId={id}
        initialTitle={title}
        initialDescription={description}
        initialDueDate={dueDate}
        onSave={handleEditSave}
      />

      <DeleteConfirmationModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
      />
    </Card>
  );
};

export default TaskCard;
