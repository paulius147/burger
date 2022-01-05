import React from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Routes } from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

const App = () => {
  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/checkout/*" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/" element={<BurgerBuilder />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
