import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import { DisabledInfo } from "../../../containers/BurgerBuilder/BurgerBuilder";

interface BuildProps {
  ingredientAdded(type: string): void;
  ingredientRemoved(type: string): void;
  disabled: DisabledInfo;
  price: number;
  purchasable: boolean;
  ordered(): void;
  isAuth: boolean;
}

interface Control {
  label: string;
  type: string;
}

const controls: Control[] = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props: BuildProps) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current price: <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          label={ctrl.label}
          key={ctrl.label}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        onClick={props.ordered}
        disabled={!props.purchasable}
      >
        {props.isAuth ? "ORDER NOW" : "SIGN UP TO ORDER"}
      </button>
    </div>
  );
};

export default BuildControls;
