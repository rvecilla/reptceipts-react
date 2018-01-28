import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../Actions/User';

import { Card, CardContent, Content, Title, Subtitle } from 'bloomer';

class Receipt extends Component {
  render() {
    const { location, subtotal, date, time } = this.props;
    return (
      <Card>
        <CardContent>
          <Content>
            <Title isSize={4}>{location}</Title>
            <Subtitle isSize={6}>Subtotal: {subtotal}</Subtitle>
            <small>
              When: {date} at {time}
            </small>
          </Content>
        </CardContent>
      </Card>
    );
  }
}

export default Receipt;
