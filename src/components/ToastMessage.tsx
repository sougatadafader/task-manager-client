import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

interface ToastMessageProps {
  show: boolean;
  message: string;
  onClose: () => void;
  bg?: string; // optional background (success, danger, etc.)
}

const ToastMessage: React.FC<ToastMessageProps> = ({ show, message, onClose, bg = "danger" }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose} delay={3000} autohide bg={bg}>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
