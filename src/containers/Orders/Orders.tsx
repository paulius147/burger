import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

interface IOrder {
  customer: {
    address: {
      country: string;
      street: string;
      zipCode: string;
    };
    email: string;
    name: string;
  };
  deliveryMethod: string;
  id: string;
  ingredients: {
    salad: number;
    cheese: number;
    bacon: number;
    meat: number;
  };
  price: string;
}

interface OrdersState {
  loading: boolean;
  orders: IOrder[];
}

class Orders extends Component {
  state: OrdersState = {
    loading: true,
    orders: [],
  };

  componentDidMount() {
    axios
      .get(
        "https://reactts-burger-builder-project-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
      )
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({ ...res.data[key], id: key });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    return (
      <div>
        {this.state.orders.map((order: IOrder) => {
          return (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={+order.price}
            />
          );
        })}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
