import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import { withErrorHandler } from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { BurgerBuilderInitialState } from "../../store/reducers/burgerBuilder";
import { useNavigate } from "react-router-dom";
import * as actions from "../../store/actions/index";
import { AxiosInstance } from "axios";
import { OrderData } from "../Checkout/ContactData/ContactData";
import { Order } from "../../store/reducers/order";
import { AuthInitialState } from "../../store/reducers/auth";

export interface Props {
  ings: IngredientsType;
  price: number;
  error: boolean;
  onIngredientAdded(): AddRemoveAction;
  onIngredientRemoved(): AddRemoveAction;
  onInitIngredients(): AxiosInstance;
  onOrderBurger(order: OrderData, token: string): AxiosInstance;
  loading: boolean;
  onPurchaseInit(): { type: string };
  onFetchOrders(token: string, userId: string): AxiosInstance;
  orders: Order[];
  token: string;
  isAuthenticated: boolean;
  onSetAuthRedirectPath(path: string): { type: string; path: string };
  userId: string;
}

export interface IngredientsType {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
  [key: string]: number;
}

interface AddRemoveAction {
  type: string;
  ingredientName: string;
}

export interface DisabledInfo {
  salad: boolean;
  bacon: boolean;
  cheese: boolean;
  meat: boolean;
  [key: string]: boolean;
}

const DISABLED_INFO: DisabledInfo = {
  salad: true,
  cheese: true,
  meat: true,
  bacon: true,
};

const BurgerBuilder = (props: Props) => {
  const [purchasing, setPurchasing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    props.onInitIngredients();
    // eslint-disable-next-line
  }, []);

  const updatePurchaseState = (ingredients: IngredientsType): boolean => {
    const sum = Object.keys(ingredients)
      .map((igKey) => ingredients[igKey])
      .reduce((sum, el) => sum + el, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      navigate("/auth");
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onPurchaseInit();
    navigate("/checkout");
  };

  const disabledInfo: DisabledInfo = {
    ...DISABLED_INFO,
  };
  for (let key in disabledInfo) {
    if (props.ings) {
      disabledInfo[key] = props.ings[key] <= 0;
    }
  }

  let orderSummary = null;
  let burger = props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
  if (props.ings) {
    burger = (
      <Aux>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          disabled={disabledInfo}
          price={props.price}
          purchasable={updatePurchaseState(props.ings)}
          ordered={purchaseHandler}
          isAuth={props.isAuthenticated}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        price={props.price}
      />
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

const mapStateToProps = (state: {
  burgerBuilder: BurgerBuilderInitialState;
  auth: AuthInitialState;
}) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<BurgerBuilderInitialState, void, Action>
) => {
  return {
    onIngredientAdded: (ingName: string) =>
      dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName: string) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path: string) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
