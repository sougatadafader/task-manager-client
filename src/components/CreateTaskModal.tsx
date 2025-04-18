import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Task } from "../types/Types";

interface CreateTaskModalProps {
  show: boolean;
  handleClose: () => void;
  initialTitle?: string;
  initialDescription?: string;
  initialDueDate?: string;
  onSave: (updatedTask: Task) => void;
  isEditMode: boolean;
  taskId: number;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  show = false,
  handleClose,
  initialTitle = "",
  initialDescription = "",
  initialDueDate = "",
  onSave,
  isEditMode = false,
  taskId,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
  
    if (initialDueDate) {
      try {
        const parsed = new Date(initialDueDate);
        const localDateString = parsed.toISOString().split("T")[0]; // YYYY-MM-DD
        setDueDate(localDateString);
      } catch {
        setDueDate("");
      }
    } else {
      setDueDate("");
    }
  
    setError("");
  }, [initialTitle, initialDescription, initialDueDate, show]);
  
  

  const handleSave = () => {
    if (!title.trim() || !description.trim() || !dueDate?.trim()) {
      setError("Please fill in all the fields.");
      return;
    }
  
    const selectedDate = new Date(`${dueDate}T12:00:00`);
    const now = new Date();
  
    now.setHours(0, 0, 0, 0);
  
    if (selectedDate < now) {
      setError("Due date cannot be in the past.");
      return;
    }
  
    setError("");
  
    const updatedTask: Task = {
        id: taskId,
        title,
        description,
        dueDate: dueDate.split("T")[0],
      };
    onSave(updatedTask);
  };
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? "Edit Task" : "Create Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTaskModal;
