import { IngredientsType } from "../../containers/BurgerBuilder/BurgerBuilder";
import {
  FormData,
  OrderData,
} from "../../containers/Checkout/ContactData/ContactData";
import * as actionTypes from "../actions/actionTypes";

interface Action {
  type: string;
  orderData: OrderData;
  orderId: string;
  orders: Order[];
}

export interface Order {
  ingredients: IngredientsType;
  price: string;
  orderData: FormData;
  id: string;
}

export interface OrdersInitialState {
  orders: Order[];
  loading: boolean;
  purchased: boolean;
}

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const reducer = (state: OrdersInitialState = initialState, action: Action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
      };
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
      };
    case actionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders,
      };
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
