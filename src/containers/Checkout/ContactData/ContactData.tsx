import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import { IngredientsType } from "../../BurgerBuilder/BurgerBuilder";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import { BurgerBuilderInitialState } from "../../../store/reducers/burgerBuilder";
import { withErrorHandler } from "../../../hoc/withErrorHandler/withErrorHandler";
import { Props } from "../../BurgerBuilder/BurgerBuilder";
import * as actions from "../../../store/actions/index";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { OrdersInitialState } from "../../../store/reducers/order";
import { AuthInitialState } from "../../../store/reducers/auth";

export interface OrderData {
  ingredients: IngredientsType;
  price: string;
  orderData: FormData;
}

export interface Validation {
  required: boolean;
  minLength?: number;
  maxLength?: number;
}

export interface OrderFormKey {
  elementType: string;
  elementConfig: OrderConfig;
  value: string;
  validation: Validation;
  valid: boolean;
  touched: boolean;
}

export interface OrderConfig {
  type: string;
  placeholder: string;
}

interface DeliveryMethod {
  elementType: string;
  elementConfig: Options;
  value: string;
  validation?: Validation;
  valid: boolean;
  touched?: boolean;
}

export interface DeliveryOptions {
  value: string;
  displayValue: string;
}

export interface Options {
  options: DeliveryOptions[];
}

export interface FormData {
  country: string;
  deliveryMethod: string;
  email: string;
  name: string;
  street: string;
  zipCode: string;
  [key: string]: string;
}

interface ContactDataState {
  orderForm: {
    name: OrderFormKey;
    street: OrderFormKey;
    zipCode: OrderFormKey;
    country: OrderFormKey;
    email: OrderFormKey;
    deliveryMethod: DeliveryMethod;
    [key: string]: OrderFormKey | DeliveryMethod;
  };
  formIsValid: boolean;
}

class ContactData extends Component<Props> {
  state: ContactDataState = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        valid: true,
      },
    },
    formIsValid: false,
  };

  orderHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {} as FormData;
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] =
        this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price.toFixed(2),
      orderData: formData,
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  checkValidity(value: string, rules: Validation): boolean {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (e: Event, inputIdentifier: string) => {
    const target = e.target as HTMLInputElement;
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = target.value;
    if (target.tagName === "INPUT") {
      updatedFormElement.valid = this.checkValidity(
        updatedFormElement.value,
        updatedFormElement.validation!
      );
      updatedFormElement.touched = true;
    }
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form: JSX.Element = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => {
          return (
            <Input
              shouldValidate={formElement.config.validation ? true : false}
              invalid={!formElement.config.valid}
              changed={(e?: Event) =>
                this.inputChangedHandler(e!, formElement.id)
              }
              elementType={formElement.config.elementType}
              key={formElement.id}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              touched={formElement.config.touched ? true : false}
            />
          );
        })}
        <Button disabled={!this.state.formIsValid} btnType="Success">
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
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

const mapStateToProps = (state: {
  burgerBuilder: BurgerBuilderInitialState;
  order: OrdersInitialState;
  auth: AuthInitialState;
}) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<OrdersInitialState, void, Action>
) => {
  return {
    onOrderBurger: (orderData: OrderData, token: string) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
