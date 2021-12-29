import React from "react";
import classes from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
  return <div className={classes.Modal}>{props.children}</div>;
};

export default Modal;
