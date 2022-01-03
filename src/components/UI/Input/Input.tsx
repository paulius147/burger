import React from "react";
import classes from "./Input.module.css";

interface InputProps {
  elementType: string;
  elementConfig: string;
  value: string;
}

const Input = (props: InputProps) => {
  let inputElement = null;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  console.log("asd");

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>dasdsad</label>
      {inputElement}
    </div>
  );
};

export default Input;
