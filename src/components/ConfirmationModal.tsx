import { FC, ReactNode, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { CartItem, useShoppingCart } from "../context/ShoppingCartContext";

type ConfirmationModalProps = {
  children?: ReactNode;
  show: boolean;
  handleClose: () => void;
  handleConfirm: (args: any) => void;
  data: any;
};
const ConfirmationModal: FC<ConfirmationModalProps> = ({ show, handleClose, handleConfirm, data }) => {
  const handleConfirmAction = () => {
    handleConfirm(data);
    handleClose();
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Hey, yo!</Modal.Title>
      </Modal.Header>
      <Modal.Body>There are few goods in your cart! Shoud we replace them ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleClose()}>
          No
        </Button>
        <Button variant="primary" onClick={() => handleConfirmAction()}>
          Yes, replace
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
