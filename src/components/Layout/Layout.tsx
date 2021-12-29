import React from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <Aux>
      <Toolbar />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
