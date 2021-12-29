import React from "react";
import Aux from "../../../hoc/Auxiliary";
import { IngredientsType } from "../../../containers/BurgerBuilder/BurgerBuilder";

interface OrderSummaryProps {
  ingredients: IngredientsType;
}

const OrderSummary = (props: OrderSummaryProps) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicous burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
    </Aux>
  );
};

export default OrderSummary;
