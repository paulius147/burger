import React, { useEffect } from "react";
import { Dispatch } from "redux";
import * as actions from "../../../store/actions/index";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

interface LogoutProps {
  onLogout(): { type: string };
}

const Logout = (props: LogoutProps) => {
  useEffect(() => {
    props.onLogout();
    // eslint-disable-next-line
  }, []);

  return <Navigate to="/" />;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
