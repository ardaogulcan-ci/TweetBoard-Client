import React, { Component, PropTypes } from 'react';

import TwitterButton from '../../components/TwitterButton/TwitterButton';
import Button from '../../components/Button/Button';

import './style.css';

class Header extends Component {

  render() {
    const { onSignUp, onTwitterEvent, user } = this.props
    return (
      <header className="header">
        <div className="logo-container">
          <h1 className="logo">TweetBoard</h1>
        </div>
        { !user &&
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
        }
        { user &&
          <div className="menu-container">
            <nav className="menu">
              <Button
                className="brand-blue-bg"
                rounded={true}>
                Boards
              </Button>
            </nav>
            <div className="profile-picture">
              <img src={user.getIn(['profile', 'picture'])} role="presentation" />
            </div>
          </div>
        }
      </header>
    );
  }
}

Header.propTypes = {
  onSignUp: PropTypes.func,
  onTwitterEvent: PropTypes.func,
  user: PropTypes.any,
}

export default Header;
