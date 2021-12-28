import React, { Component } from "react";
import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

interface BurgerBuilderProps {}

export interface Ingredient {
  [ingredient: string]: number;
}

interface BurgerBuilderState {
  ingredients: Ingredient;
}
class BurgerBuilder extends Component<BurgerBuilderProps, BurgerBuilderState> {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
  };

  addIngredientHandler = (type: string) => {
    // const oldCount = this.state.ingredients[type];
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls ingredientAdded={this.addIngredientHandler} />
      </Aux>
    );
  }
}

export default BurgerBuilder;
