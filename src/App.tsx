import React from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Routes } from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";

const App = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/checkout/*" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<BurgerBuilder />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
