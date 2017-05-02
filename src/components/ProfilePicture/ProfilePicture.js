import React, { Component, PropTypes } from 'react';

import './style.css';

class ProfilePicture extends Component {
  render() {
    return (
      <div className="profile-picture">
        <img src={this.props.picture} role="presentation" />
      </div>
    );
  }
}

ProfilePicture.propTypes = {
  picture: PropTypes.string,
  user: PropTypes.any,
}

export default ProfilePicture;
