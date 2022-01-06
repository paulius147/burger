import React, { Component } from "react";
import { AxiosInstance, AxiosError } from "axios";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";
import { Props } from "../../containers/BurgerBuilder/BurgerBuilder";

type WithErrorHandlerState = {
  error: AxiosError | undefined;
};

export function withErrorHandler<T extends Props = Props>(
  WrappedComponent: React.ComponentType<T>,
  axios: AxiosInstance
) {
  return class WithErrorHandler extends Component<
    Omit<T, keyof Props>,
    WithErrorHandlerState
  > {
    reqInterceptor: number | undefined = undefined;
    respInterceptor: number | undefined = undefined;

    state: WithErrorHandlerState = {
      error: undefined,
    };

    componentDidMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: undefined });
        return req;
      });
      this.respInterceptor = axios.interceptors.response.use(
        undefined,
        (error) => {
          this.setState({ error: error });
          return Promise.reject(error);
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor as number);
      axios.interceptors.response.eject(this.respInterceptor as number);
    }

    errorConfirmHandler = () => {
      this.setState({
        error: undefined,
      });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error ? true : false}
            modalClosed={this.errorConfirmHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...(this.props as T)} />
        </Aux>
      );
    }
  };
}
