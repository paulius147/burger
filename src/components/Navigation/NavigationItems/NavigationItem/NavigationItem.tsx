import React from "react";
import classes from "./NavigationItem.module.css";

interface NavigationItemProps {
  children: React.ReactNode;
  link: string;
  active: boolean;
}

const NavigationItem = (props: NavigationItemProps) => {
  return (
    <li className={classes.NavigationItem}>
      <a
        href={props.link}
        className={props.active ? classes.active : undefined}
      >
        {props.children}
      </a>
    </li>
  );
};

export default NavigationItem;
