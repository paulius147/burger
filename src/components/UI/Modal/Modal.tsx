import React, { Component } from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import { BurgerBuilderState } from "../../../containers/BurgerBuilder/BurgerBuilder";

interface ModalProps {
  children: React.ReactNode;
  show: boolean;
  modalClosed(): void;
}

class Modal extends Component<ModalProps> {
  shouldComponentUpdate(nextProps: ModalProps, nextState: BurgerBuilderState) {
    return nextProps.show !== this.props.show;
  }
  componentDidUpdate() {
    console.log("asd");
  }
  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
