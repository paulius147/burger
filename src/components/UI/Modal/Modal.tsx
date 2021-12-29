import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary";

interface ModalProps {
  children: React.ReactNode;
  show: boolean;
  modalClosed(): void;
}

const Modal = (props: ModalProps) => {
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};

export default Modal;
