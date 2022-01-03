import React from "react";
import classes from "./Input.module.css";
import { Options, OrderConfig } from '../../../containers/Checkout/ContactData/ContactData'

interface InputProps {
  elementType: string;
  elementConfig: OrderConfig | Options;
  value: string;
}

const Input = (props: InputProps) => {
  let inputElement = <input />;

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
        // type={props.elementType}
        // placeholder={props.placeholder}
        // value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
        // value={props.value}
        />
      );
      break;
    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
        // value={props.value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}></label>
      {inputElement}
    </div>
  );
};

export default Input;
