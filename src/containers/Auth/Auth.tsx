import React, { useState } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { OrderFormKey, Validation } from "../Checkout/ContactData/ContactData";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "redux";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { AuthInitialState } from "../../store/reducers/auth";

interface AuthProps {
  onAuth(email: string, password: string, isSignup: boolean): void;
  loading: boolean;
  error: Error | null;
}

interface Controls {
  email: OrderFormKey;
  password: OrderFormKey;
  [key: string]: OrderFormKey;
}

const Auth = (props: AuthProps) => {
  const [controls, setControls] = useState<Controls>({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email Address",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });

  const [isSignup, setIsSignup] = useState(true);

  const checkValidity = (value: string, rules: Validation): boolean => {
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
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const switchAuthHandler = () => {
    setIsSignup(!isSignup);
  };

  const inputChangedHandler = (e: Event, controlName: string) => {
    const target = e.target as HTMLInputElement;
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value: target.value,
        valid: checkValidity(target.value, controls[controlName].validation),
        touched: true,
      },
    };
    setControls(updatedControls);
  };

  const formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key],
    });
  }

  const form = formElementsArray.map((formElement) => (
    <Input
      shouldValidate={formElement.config.validation ? true : false}
      invalid={!formElement.config.valid}
      changed={(e?: Event) => inputChangedHandler(e!, formElement.id)}
      elementType={formElement.config.elementType}
      key={formElement.id}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      touched={formElement.config.touched ? true : false}
    />
  ));

  let errorMessage = null;

  if (props.error) {
    errorMessage = <p>{props.error.message.replace(/_/g, " ")}</p>;
  }

  return (
    <div className={classes.Auth}>
      {errorMessage}
      <form onSubmit={submitHandler}>
        {props.loading ? <Spinner /> : form}
        <Button btnType="Success">SUBMIT</Button>
      </form>
      <Button btnType="Danger" clicked={switchAuthHandler}>
        SWITCH TO {isSignup ? "SIGNIN" : "SIGNUP"}
      </Button>
    </div>
  );
};

const mapStateToProps = (state: { auth: AuthInitialState }) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<Controls, void, Action>
) => {
  return {
    onAuth: (email: string, password: string, isSignup: boolean) =>
      dispatch(actions.auth(email, password, isSignup)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
