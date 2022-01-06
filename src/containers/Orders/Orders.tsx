import React, { Component } from "react";
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

class Orders extends Component<Props> {
  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        <div>
          {this.props.orders.length === 0 ? (
            <p>No Orders.</p>
          ) : (
            this.props.orders.map((order: Order) => {
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
  }
}

const mapStateToProps = (state: { order: OrdersInitialState }) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<OrdersInitialState, void, Action>
) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
