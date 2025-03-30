import React from "react";
import { Modal, Button } from "react-bootstrap";

interface DeleteConfirmationModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirmDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  show,
  handleClose,
  handleConfirmDelete,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this task?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleConfirmDelete}>
          Delete
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
