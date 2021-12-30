import React, { Component } from "react";
import Aux from "../Auxiliary/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

interface LayoutProps {
  children: React.ReactNode;
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
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHanlder} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHanlder}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
