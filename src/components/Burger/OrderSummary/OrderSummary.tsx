import React from "react";
import Aux from "../../../hoc/Auxiliary";
import { IngredientsType } from "../../../containers/BurgerBuilder/BurgerBuilder";
import Button from "../../UI/Button/Button";

interface OrderSummaryProps {
  ingredients: IngredientsType;
  purchaseCanceled(): void;
  purchaseContinued(): void;
  price: number;
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
      <strong>Total Price: {props.price.toFixed(2)}</strong>
      <p>Continue to Checkout?</p>
      <Button clicked={props.purchaseCanceled} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.purchaseContinued} btnType="Success">
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
