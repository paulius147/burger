import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";
import { IngredientsType } from "../../../containers/BurgerBuilder/BurgerBuilder";
import {useNavigate} from 'react-router-dom'

interface CheckoutSummaryProps {
  ingredients: IngredientsType;
}

const CheckoutSummary = (props: CheckoutSummaryProps) => {
  const navigateTo = useNavigate()
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" clicked={() => {}}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={() => navigateTo('/')}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
