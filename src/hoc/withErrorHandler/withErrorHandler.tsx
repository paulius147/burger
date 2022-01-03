import React, { Component } from "react";
import { AxiosInstance, AxiosError } from "axios";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";
import { NavigateFunction } from "react-router-dom";

type WithErrorHandlerState = {
  error: AxiosError | undefined;
};

interface WithErrorHandlerProps {
  navigateTo?: NavigateFunction;
}

const withErrorHandler = (
  WrappedComponent: React.ComponentType,
  axios: AxiosInstance
) => {
  return class WithErrorHandler extends Component<
    WithErrorHandlerProps,
    WithErrorHandlerState
  > {
    reqInterceptor: number | undefined = undefined;
    respInterceptor: number | undefined = undefined;

    state: WithErrorHandlerState = {
      error: undefined,
    };

    // constructor(props: WithErrorHandlerProps) {
    // super(props);
    // this.reqInterceptor = axios.interceptors.request.use((req) => {
    //   this.setState({ error: undefined });
    //   return req;
    // });
    // this.respInterceptor = axios.interceptors.response.use(
    //   undefined,
    //   (error) => {
    //     this.setState({ error: error });
    //     return Promise.reject(error);
    //   }
    // );
    // }

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
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
