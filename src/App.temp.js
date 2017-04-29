import React, { Component } from 'react';


class App extends Component {

  constructor(props) {
    super(props);
    this.authWindow = null;
    this.handleAuthCallbackMessage = this.handleAuthCallbackMessage.bind(this);
  }

  handleAuthCallbackMessage(event) {
    window.removeEventListener('message', this.handleAuthCallbackMessage);
    console.log(event.data);
    this.authWindow.close();
    this.authWindow = null;
  }

  loginWithTwitter() {

    this.authWindow = window.open('http://127.0.0.1:9000/v1/auth/twitter', 'Twitter Authentication','width=450,height=550');

    window.addEventListener('message', this.handleAuthCallbackMessage, false);

    if (window.focus) {
      this.authWindow.focus();
    }
  }

  render() {
    return (
      <div>
        <a onClick={this.loginWithTwitter.bind(this)}>Login with Twitter</a>
      </div>
    );
  }
}

export default App;
