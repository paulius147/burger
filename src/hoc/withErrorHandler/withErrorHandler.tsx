import { AxiosError, AxiosInstance } from "axios";
import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliary/Auxiliary";

interface withErrorHandlerState {
  error: AxiosError | null;
}

const withErrorHandler = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  axios: AxiosInstance
) =>
  class WithErrorHandler extends Component<P> {
    state: withErrorHandlerState = {
      error: null,
    };

    UNSAFE_componentWillMount() {
      axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error });
        }
      );
    }

    // componentWillUnmount() {
    //   axios.interceptors.request.eject(this.reqInterceptor);
    //   axios.interceptors.response.eject(this.resInterceptor);
    // }

    errorConfirmHandler = () => {
      this.setState({ error: null });
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
          <WrappedComponent {...(this.props as P)} />
        </Aux>
      );
    }
  };

export default withErrorHandler;
