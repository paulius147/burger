import { IngredientsType } from "../containers/BurgerBuilder/BurgerBuilder";
import * as actionTypes from "./actions";

interface InitialState {
  ingredients: IngredientsType;
  totalPrice: number;
}

interface Action {
  type: string;
  ingredientName: string;
}

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};

const reducer = (state: InitialState = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
      };
    default:
      return state;
  }
};

export default reducer;
