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
import { InitialState } from "../../store/reducers/burgerBuilder";
import { useNavigate } from "react-router-dom";
import * as burgerBuilderActions from "../../store/actions/index";
import { AxiosInstance } from "axios";

export interface Props {
  ings: IngredientsType;
  price: number;
  error: boolean;
  onIngredientAdded(): AddRemoveAction;
  onIngredientRemoved(): AddRemoveAction;
  onInitIngredients(): AxiosInstance;
}

export interface IngredientsType {
  salad: number;
  bacon: number;
  cheese: number;
  meat: number;
  [key: string]: number;
}

export interface BurgerBuilderState {
  purchasing: boolean;
  loading: boolean;
  error: boolean;
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
    setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
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

const mapStateToProps = (state: InitialState) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<InitialState, void, Action>
) => {
  return {
    onIngredientAdded: (ingName: string) =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName: string) =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
