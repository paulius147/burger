import React from "react";
import classes from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  clicked?(): void;
  btnType: string;
  disabled?: boolean;
}

const Button = (props: ButtonProps) => {
  const btnClass =
    props.btnType === "Success" ? classes.Success : classes.Danger;

  return (
    <button
      disabled={props.disabled}
      className={classes.Button + " " + btnClass}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};

export default Button;
