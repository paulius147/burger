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

interface OrderFormKey {
  elementType: string;
  elementConfig: OrderConfig
  value: string;
}

export interface OrderConfig {
  type: string;
  placeholder: string;
}

interface DeliveryMethod {
  elementType: string;
  elementConfig: Options;
  value: string;
}

interface DeliveryOptions {
  value: string;
  displayValue: string;
}

export interface Options {
  options: DeliveryOptions[];
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
  loading: boolean;
}

// interface State {
//   orderForm: IOrderForm;
//   loading: boolean
// }

// interface IElement {
//   id: string,
//   config: IFormElement
// };

// export interface IOrderForm {
//   name: IFormElement,
//   street: IFormElement,
//   zipCode: IFormElement,
//   country: IFormElement,
//   email: IFormElement,
//   deliveryMethod: IFormElement,
//   [key: string]: IFormElement
// };

// interface IElementConfigOption {
//   value: string,
//   displayValue: string
// };

// export interface IFormElement {
//   elementType: string,
//   elementConfig: {
//     type?: string,
//     placeholder?: string,
//     options?: IElementConfigOption[],
//   },
//   value: string,

//   // validation?: {
//   //     required: boolean,
//   //     minLength?: number,
//   //     maxLength?: number,
//   //     isEmail?: boolean,
//   // },
//   // valid: boolean,
//   // touched?: boolean,
// };

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
    console.log(formElementsArray)

    let form: JSX.Element = (
      <form>
        {formElementsArray.map((formElement) => {
          // console.log(Form)
          return <Input
            elementType={formElement.config.elementType}
            key={formElement.id}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
          />;
        })}
        < Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form >
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