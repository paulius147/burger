import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { IngredientsType } from "../BurgerBuilder/BurgerBuilder";
import { useNavigate, Route, Routes } from "react-router-dom";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import { BurgerBuilderInitialState } from "../../store/reducers/burgerBuilder";
import { Navigate } from "react-router-dom";
// import { Dispatch } from "redux";
// import * as actions from "../../store/actions/index";
import { OrdersInitialState } from "../../store/reducers/order";

interface CheckOutProps {
  ings: IngredientsType;
  totalPrice: number;
  purchased: boolean;
}

const Checkout = (props: CheckOutProps) => {
  const navigate = useNavigate();

  const checkoutContinuedHandler = () => {
    navigate("/checkout/contact-data", { replace: true });
  };
  const checkoutCancelledHandler = () => {
    navigate(-1);
  };

  let summary = <Navigate to="/" />;
  if (props.totalPrice > 4) {
    const purchasedRedirect = props.purchased ? <Navigate to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
          ingredients={props.ings}
        />
        <Routes>
          <Route path={"/contact-data"} element={<ContactData />} />
        </Routes>
      </div>
    );
  }

  return summary;
};

const mapStateToProps = (state: {
  burgerBuilder: BurgerBuilderInitialState;
  order: OrdersInitialState;
}) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
