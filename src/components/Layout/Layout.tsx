import React from "react";
import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <Aux>
      <div>Toolbar</div>
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

export default Layout;
