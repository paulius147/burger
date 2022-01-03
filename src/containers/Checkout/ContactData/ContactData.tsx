import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import { IngredientsType } from "../../BurgerBuilder/BurgerBuilder";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

interface ContactDataProps {
  ingredients: IngredientsType;
  price: number | string;
  navigate(arg: string): void;
}

interface Options {
  value: string;
  displayValue: string;
}

interface Key {
  elementType: string;
  elementConfig: {
    type: string;
    placeholder: string;
  };
  value: string;
}

interface DeliveryMethod {
  elementType: string;
  elementConfig: {
    options: Options[];
  };
  value: string;
}

interface ContactDataState {
  orderForm: {
    name: Key;
    street: Key;
    zipCode: Key;
    country: Key;
    email: Key;
    deliveryMethod: DeliveryMethod;
    [key: string]: string | Key | DeliveryMethod;
  };
  loading: boolean;
}

class ContactData extends Component<ContactDataProps> {
  state: ContactDataState = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
      },
    },
    loading: false,
  };

  orderHandler = (e?: Event) => {
    e!.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Paulius",
        address: {
          street: "Teststreet 1",
          zipCode: "48624",
          country: "LT",
        },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.navigate("/");
      })
      .catch((err) => this.setState({ loading: false }));
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form>
        {formElementsArray.map((formElement: any) => {
          <Input
            key={formElement.id}
            elementType="input"
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.elementConfig}
          />;
        })}
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
