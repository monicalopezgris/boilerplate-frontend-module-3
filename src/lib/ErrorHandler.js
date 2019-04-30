import React, { Component } from 'react';

const WithErrorHandler = (Comp) => {
  class ErrorHandler extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        errorInfo: null,
      };
    }

    componentDidCatch(error, errorInfo) {
      this.setState({
        error,
        errorInfo,
      });
      console.log('error', this.state.errorInfo);
    }

    render() {
      const { error } = this.state;
      if (error) {
        return <p>Error</p>;
      }
      return <Comp />;
    }
  }
  return ErrorHandler;
};

export default WithErrorHandler;

