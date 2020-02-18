import * as React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false 
        };
    }

    static getDerivedStateFromError(error) {
        return { 
            hasError: true 
        };
    }

    render() {
        if (this.state.hasError) {
          return <h1>Sorry, we can't reach this page.</h1>;
        }
        return this.props.children; 
      }
}

export default ErrorBoundary;