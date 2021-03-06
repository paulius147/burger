import { IngredientsType } from "../../containers/BurgerBuilder/BurgerBuilder";
import * as actionTypes from "../actions/actionTypes";

export interface BurgerBuilderInitialState {
  ingredients: IngredientsType;
  totalPrice: number;
  error: boolean;
  building: boolean;
}

interface Action {
  type: string;
  ingredientName: string;
  ingredients: IngredientsType;
}

const initialState: BurgerBuilderInitialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES: IngredientsType = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (
  state: BurgerBuilderInitialState = initialState,
  action: Action
) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4,
        building: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
