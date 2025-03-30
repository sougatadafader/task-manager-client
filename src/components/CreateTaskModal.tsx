import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
}

interface CreateTaskModalProps {
  show: boolean;
  handleClose: () => void;
  initialTitle?: string;
  initialDescription?: string;
  initialDueDate?: string;
  onSave: (updatedTask: Task) => void;
  isEditMode: boolean;
  taskId: number;  // Add taskId as a prop
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({
  show,
  handleClose,
  initialTitle = "",
  initialDescription = "",
  initialDueDate = "",
  onSave,
  isEditMode,
  taskId,  // Access taskId here
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [error, setError] = useState<string>(""); // State for storing error messages

  const handleSave = () => {
    // Check if the title, description, and dueDate are non-empty
    if (!title.trim() || !description.trim() || !dueDate.trim()) {
      setError("Please fill in all the fields.");
      return; // Stop further execution
    }

    // Validate the dueDate is not in the past
    const currentDate = new Date();
    const selectedDate = new Date(dueDate);
    if (selectedDate < currentDate) {
      setError("Due date cannot be in the past.");
      return; // Stop further execution
    }

    // Clear the error if everything is valid
    setError("");

    // Now pass the updated task to onSave
    const updatedTask = {
      id: taskId,  // Use taskId here
      title,
      description,
      due_date: dueDate,  // Use dueDate here
    };

    onSave(updatedTask);  // Pass updated task with id
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? "Edit Task" : "Create Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Display error message if any */}
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
