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
import * as actionTypes from "../../store/actions";
import { Dispatch } from "redux";
import { InitialState } from "../../store/reducer";
import { useNavigate } from "react-router-dom";

export interface Props {
  ings: IngredientsType;
  price: number;
  onIngredientAdded(): AddRemoveAction;
  onIngredientRemoved(): AddRemoveAction;
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://reactts-burger-builder-project-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json"
  //     )
  //     .then((response) => {
  //       // this.setState({ ingredients: response.data);
  //     })
  //     .catch((err) => {
  //       setError(true);
  //     });
  // }, []);

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
  let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;
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
  if (loading) {
    orderSummary = <Spinner />;
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
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onIngredientAdded: (ingName: string) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName,
      }),
    onIngredientRemoved: (ingName: string) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
