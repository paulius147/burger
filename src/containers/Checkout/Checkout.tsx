import React, { useState, useEffect } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { IngredientsType } from "../BurgerBuilder/BurgerBuilder";
import { useNavigate, Route, Routes } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import { InitialState } from "../../store/reducer";

interface CheckOutProps {
  ings: IngredientsType;
}

const Checkout = (props: CheckOutProps) => {
  const navigate = useNavigate();
  const navigateTo = (arg: string) => {
    navigate(arg);
  };

  const checkoutContinuedHandler = () => {
    navigate("/checkout/contact-data", { replace: true });
  };
  const checkoutCancelledHandler = () => {
    navigate(-1);
  };

  return (
    <div>
      <CheckoutSummary
        checkoutCancelled={checkoutCancelledHandler}
        checkoutContinued={checkoutContinuedHandler}
        ingredients={props.ings}
      />
      <Routes>
        <Route
          path={"/contact-data"}
          element={<ContactData navigate={navigateTo} />}
        />
      </Routes>
    </div>
  );
};

const mapStateToProps = (state: InitialState) => {
  return {
    ings: state.ingredients,
  };
};

export default connect(mapStateToProps)(Checkout);
