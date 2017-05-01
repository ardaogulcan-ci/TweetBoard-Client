import React, { Component, PropTypes } from 'react';

import Button from '../Button/Button';
import twitterIcon from '../../assets/twitter.svg';

import config from '../../configs/environment'

import styles from './style.css';

class TwitterButton extends Component {

  constructor(props) {
    super(props);
    this.authWindow = null;
    this.handleAuthCallbackMessage = this.handleAuthCallbackMessage.bind(this);
  }

  handleTwitter() {
    this.authWindow = window.open(`${config.api.url}/auth/twitter`, 'Twitter Authentication','width=450,height=550');

    window.addEventListener('message', this.handleAuthCallbackMessage, false);

    if (window.focus) {
      this.authWindow.focus();
    }
  }

  handleAuthCallbackMessage(event) {
    window.removeEventListener('message', this.handleAuthCallbackMessage);
    this.authWindow.close();
    this.authWindow = null;
    this.props.onTwitterEvent && this.props.onTwitterEvent(event.data);
  }

  render() {
    return (
      <Button
        className='brand-blue-bg'
        onClick={this.handleTwitter.bind(this)}
        rounded={true}
        icon={twitterIcon}
        iconClass={styles.iconStyle}>
        Login with Twitter
      </Button>
    );
  }
}

TwitterButton.propTypes = {
  onTwitterEvent: PropTypes.func,
}

export default TwitterButton;
