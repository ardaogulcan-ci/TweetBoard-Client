import React, { Component, PropTypes } from 'react';
import{ connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

  render() {
    const { children } = this.props;
    return (
      <MuiThemeProvider>
        <div>
          { children }
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default connect(
  (state, props) => ({
    location: props.location,
  })
)(App);
