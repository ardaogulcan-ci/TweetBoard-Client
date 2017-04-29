import React, { Component, PropTypes } from 'react';

import TwitterButton from '../../components/TwitterButton/TwitterButton';
import Button from '../../components/Button/Button';

import './style.css';

class Header extends Component {

  render() {
    const { onSignUp, onTwitterEvent } = this.props
    return (
      <header className="header">
        <div className="logo-container">
          <h1 className="logo">TweetBoard</h1>
        </div>
        <div className="buttons-container">
          <div className="button">
            <Button
              className="brand-green-bg"
              rounded={true}
              onClick={onSignUp}>
              Sign Up / Register
            </Button>
          </div>
          <div className="button">
            <TwitterButton
              onTwitterEvent={onTwitterEvent} />
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  onSignUp: PropTypes.func,
  onTwitterEvent: PropTypes.func,
}

export default Header;
