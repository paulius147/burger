import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

interface NavigationItemProps {
  children: React.ReactNode;
  link: string;
}

const NavigationItem = (props: NavigationItemProps) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink
        className={({ isActive }) => (isActive ? classes.active : "")}
        to={props.link}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default NavigationItem;
