import React from "react";

interface AuxProps {
  children: React.ReactNode;
}

const Aux = (props: AuxProps) => <>{props.children}</>;

export default Aux;
