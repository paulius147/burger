import { IngredientsType } from "../../containers/BurgerBuilder/BurgerBuilder";
import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
import { Dispatch } from "redux";

export const addIngredient = (name: string) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name: string) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients: IngredientsType) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return (dispatch: Dispatch) => {
    axios
      .get(
        "https://reactts-burger-builder-project-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json"
      )
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((err) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
