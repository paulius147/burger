import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";

interface BurgerBuilderProps {}

interface Ingredient {
  [ingredient: string]: number;
}

export interface BurgerBuilderState {
  ingredients: Ingredient;
}

class BurgerBuilder extends Component<BurgerBuilderProps, BurgerBuilderState> {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 2,
      meat: 2,
    },
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <div>build controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
