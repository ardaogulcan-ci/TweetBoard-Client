import React, { Component, PropTypes } from 'react';

import './style.css';

class Dialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      show: nextProps.show,
    })
  }

  componentDidMount() {
    document.body.append(document.querySelector('div.dialog-container'));
  }

  render() {
    return (
      <div className={`dialog-container ${!this.state.show ? 'hide': ''}`}>
        <div className="dialog-box">
          <h1 className="dialog-title">{this.props.title}</h1>
          <div className="dialog-content">
          {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Dialog.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
}
export default Dialog;
