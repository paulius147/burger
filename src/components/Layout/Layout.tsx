import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

interface LayoutProps {
  children: React.ReactNode;
}

interface LayoutState {
  showSideDrawer: boolean;
}

class Layout extends Component<LayoutProps> {
  state: LayoutState = {
    showSideDrawer: true,
  };

  sideDrawerClosedHanlder = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    return (
      <Aux>
        <Toolbar />
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
