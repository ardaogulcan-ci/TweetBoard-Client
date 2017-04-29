import React, { Component } from 'react';
import{ connect } from 'react-redux';

import Header from '../../components/Header/Header';
import TextInput from '../../components/TextInput/TextInput';

import { twitterAuthRequest } from '../../actions/authentication';

import './style.css';

class HomeContainer extends Component {

  handleTwitterEvent(data) {
    if (!data.error) {
      this.props.dispatch(twitterAuthRequest(data));
    }
  }

  render() {
    return (
      <div className="center">
        <Header onTwitterEvent={this.handleTwitterEvent.bind(this)}/>
        <main>
          <TextInput type="text" />
        </main>
      </div>
    );
  }
}

export default connect(
  state => ({
    authentication: state.authentication,
  })
)(HomeContainer);
