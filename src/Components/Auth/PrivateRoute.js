import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: ComponentPassed, ...rest }) => {
  class Auth extends Component {
    handleRender(props) {
      /* Redirects to '/' (Landing) component if not authenticated */
      if (!this.props.authenticated) {
        return (
          <Redirect
            to={{
              pathname: '/',
              state: {
                from: props.location
              }
            }}
          />
        );
      } else {
        /* else returns the component passed in */
        return <ComponentPassed {...props} />;
      }
    }

    render() {
      return (
        /* Renders whatever handleRender() decides */
        <Route {...rest} render={this.handleRender.bind(this)} />
      );
    }
  }

  /* Needed to get auth props */
  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  const AuthContainer = connect(mapStateToProps)(Auth);
  return <AuthContainer />;
};
