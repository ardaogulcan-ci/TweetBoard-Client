import React, { Component, PropTypes } from 'react';

import './style.css';

class ExpandableLink extends Component {
  render() {
    const { title } = this.props;
    return (
      <div className="expandable-link brand-gray-bg">{title}</div>
    );
  }
}

ExpandableLink.propTypes = {
  title: PropTypes.string,
}

export default ExpandableLink
