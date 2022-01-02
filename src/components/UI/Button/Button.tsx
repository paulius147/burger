import React from "react";
import { NavigateFunction } from "react-router-dom";
import classes from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  clicked(): void;
  btnType: string;
}

const Button = (props: ButtonProps) => {
  const btnClass =
    props.btnType === "Success" ? classes.Success : classes.Danger;

  return (
    <button className={classes.Button + " " + btnClass} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default Button;
