import React from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Routes } from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";
import { useNavigate } from "react-router";
import Orders from "./containers/Orders/Orders";

const App = () => {
  let navigate = useNavigate();

  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/checkout/*" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/" element={<BurgerBuilder navigateTo={navigate} />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
