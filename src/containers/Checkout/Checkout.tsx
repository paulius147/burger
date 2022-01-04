import React, { useState, useEffect } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { IngredientsType } from "../BurgerBuilder/BurgerBuilder";
import { useNavigate, useLocation, Route, Routes } from "react-router-dom";
import ContactData from "./ContactData/ContactData";

const Checkout = () => {
  const search = useLocation();
  const navigate = useNavigate();
  const navigateTo = (arg: string) => {
    navigate(arg);
  };
  const [ingredients, setIngredients] = useState<IngredientsType>({
    salad: 1,
    meat: 1,
    cheese: 1,
    bacon: 1,
  });
  const [totalPrice, setTotalPrice] = useState<string | number>(0);

  useEffect(() => {
    const query = new URLSearchParams(search.search);
    const params = Object.fromEntries(query);
    const paramIngredients = {} as IngredientsType;
    let price: number | string = 0;
    for (let param in params) {
      if (param === "price") {
        price = Number(params[param]).toFixed(2);
      } else {
        paramIngredients[param] = parseInt(params[param]);
      }
    }
    setIngredients(paramIngredients);
    setTotalPrice(price);
  }, []);

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
        ingredients={ingredients}
      />
      <Routes>
        <Route
          path={"/contact-data"}
          element={
            <ContactData
              navigate={navigateTo}
              price={totalPrice}
              ingredients={ingredients}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Checkout;
