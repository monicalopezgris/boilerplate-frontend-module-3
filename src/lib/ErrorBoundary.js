import React, { Component } from 'react';

const ErrorBoundary = (WrappedComponent) => {
  return class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
      this.setState({
        error,
        errorInfo,
      });
    }

    render() {
      const { error, errorInfo } = this.state;
      if (errorInfo) {
        return (
          <div>
            <h2>Something went wrong</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {error && error.toString()}
              <br />
              {errorInfo.componentStack}
            </details>
          </div>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  }
}


export default ErrorBoundary;
