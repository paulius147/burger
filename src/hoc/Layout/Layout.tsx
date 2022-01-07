import React, { Component } from "react";
import Aux from "../Auxiliary/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
import { AuthInitialState } from "../../store/reducers/auth";

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

interface LayoutState {
  showSideDrawer: boolean;
}

class Layout extends Component<LayoutProps> {
  state: LayoutState = {
    showSideDrawer: false,
  };

  sideDrawerClosedHanlder = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHanlder = () => {
    this.setState((prevState: LayoutState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHanlder}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHanlder}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state: { auth: AuthInitialState }) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
