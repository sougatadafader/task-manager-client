import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface EditTaskModalProps {
  show: boolean;
  handleClose: () => void;
  taskId: number;
  initialTitle: string;
  initialDescription: string;
  initialDueDate: string;
  onSave: (task: { id: number; title: string; description: string; dueDate: string }) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  show = false,
  handleClose,
  taskId,
  initialTitle,
  initialDescription,
  initialDueDate,
  onSave,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [dueDate, setDueDate] = useState(initialDueDate);

  const handleSave = () => {
    const updatedTask = {
      id: taskId,
      title,
      description,
      dueDate: dueDate,
    };
    onSave(updatedTask);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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

export default EditTaskModal;
