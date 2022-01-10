import React, { useEffect } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Navigate, Route, Routes } from "react-router-dom";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from "react-redux";
import { Action } from "redux";
import * as actions from "./store/actions/index";
import { AuthInitialState } from "./store/reducers/auth";
import { ThunkDispatch } from "redux-thunk";

interface AppProps {
  onTryAutoSignup(): void;
  isAuthenticated: boolean;
}

const App = (props: AppProps) => {
  useEffect(() => {
    props.onTryAutoSignup();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/checkout/*" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<BurgerBuilder />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state: { auth: AuthInitialState }) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AuthInitialState, void, Action>
) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
