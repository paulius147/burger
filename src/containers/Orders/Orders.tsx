import React, { useEffect } from "react";
import axios from "../../axios-orders";
import OrderC from "../../components/Order/Order";
import { withErrorHandler } from "../../hoc/withErrorHandler/withErrorHandler";
import { Props } from "../../containers/BurgerBuilder/BurgerBuilder";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import * as actions from "../../store/actions/index";
import { Order, OrdersInitialState } from "../../store/reducers/order";
import { Action } from "redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { AuthInitialState } from "../../store/reducers/auth";

const Orders = (props: Props) => {
  useEffect(() => {
    const token = localStorage.getItem("token")!;
    props.onFetchOrders(token, props.userId);
    // eslint-disable-next-line
  }, []);

  let orders = <Spinner />;
  if (!props.loading) {
    orders = (
      <div>
        {props.orders.length === 0 ? (
          <p>No Orders.</p>
        ) : (
          props.orders.map((order: Order) => {
            return (
              <OrderC
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price}
              />
            );
          })
        )}
      </div>
    );
  }
  return orders;
};

const mapStateToProps = (state: {
  order: OrdersInitialState;
  auth: AuthInitialState;
}) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<OrdersInitialState, void, Action>
) => {
  return {
    onFetchOrders: (token: string, userId: string) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
