import React, { Component } from 'react';


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
    const { children } = this.props;
    if (error) {
      return <p>Error</p>;
    }
    return children;
  }
}

export default ErrorHandler;
