import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface CreateTaskModalProps {
  show: boolean;
  handleClose: () => void;
  initialTitle?: string;
  initialDescription?: string;
  initialDueDate?: string;
  onSave: (task: { title: string; description: string; due_date: string }) => void;
  isEditMode?: boolean;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  show,
  handleClose,
  initialTitle = "",
  initialDescription = "",
  initialDueDate = "",
  onSave,
  isEditMode = false,  // Default to false if not provided
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [dueDate, setDueDate] = useState(initialDueDate);

  // Reset the fields when the modal is opened or closed
  useEffect(() => {
    if (!show) {
      setTitle(initialTitle);
      setDescription(initialDescription);
      setDueDate(initialDueDate);
    }
  }, [show, initialTitle, initialDescription, initialDueDate]);

  const handleSave = () => {
    const updatedTask = {
      title,
      description,
      due_date: dueDate,
    };
    onSave(updatedTask);  
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? "Edit Task" : "Create Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {isEditMode ? "Save Changes" : "Create Task"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTaskModal;
