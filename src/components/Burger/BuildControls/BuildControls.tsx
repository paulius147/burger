import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

interface BuildProps {
  ingredientAdded: any;
}

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props: BuildProps) => {
  props.ingredientAdded("cheese");
  return (
    <div className={classes.BuildControls}>
      {controls.map((ctrl) => (
        <BuildControl label={ctrl.label} key={ctrl.label} />
      ))}
    </div>
  );
};

export default BuildControls;
