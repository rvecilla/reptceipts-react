import React, { Component } from 'react';
// Components
import { Title, Subtitle, HeroBody, Columns, Column, Image } from 'bloomer';

import * as actions from '../../Actions/Auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RegisterForm from '../Register/RegisterForm';

class Register extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    if (this.props.errorMessage) {
      this.props.authError(null);
    }
  }

  handleSubmit(values) {
    this.props.registerUser(values, this.context.router.history);
  }

  render() {
    if (this.props.authenticated) {
      return (
        <Redirect
          to={{
            pathname: '/menu/dashboard',
            state: {
              from: this.props.location,
              isLoginActive: true
            }
          }}
        />
      );
    } else {
      return (
        <HeroBody>
          <Columns>
            <Column
              isSize={{ mobile: 'full', desktop: 7 }}
              isOffset={{ desktop: 1 }}
            >
              <Title isSize={3}>Keep your purchase receipts organised</Title>
              <Subtitle isSize={6} style={{ marginTop: '10px' }}>
                {' '}
                reptceipts helps you organise, manage and redeem your purchase
                receipts{' '}
              </Subtitle>
            </Column>
          </Columns>
          <Columns>
            <Column
              isSize={{ mobile: 'full', tablet: 5, desktop: 3 }}
              isOffset={{ desktop: 1 }}
            >
              <RegisterForm
                onSubmit={this.handleSubmit}
                errorMessage={this.props.errorMessage}
              />
            </Column>
          </Columns>
        </HeroBody>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    ui: state.ui,
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, actions)(Register);
