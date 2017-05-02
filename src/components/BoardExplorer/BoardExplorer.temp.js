import React, { Component, PropTypes } from 'react';

import ProfilePicture from '../../components/ProfilePicture/ProfilePicture';
import ExpandableLink from '../../components/ExpandableLink/ExpandableLink';

import './style.css';

import Button from '../Button/Button';

class BoardExplorer extends Component {

  render() {
    const { user, boards, currentBoard, onAddBoard } = this.props;

    return (
      <div className="board-explorer">
        <div className="profile-box">
          <div className="picture-container">
            <ProfilePicture picture={user.getIn(['profile', 'picture'])} />
          </div>
          <h1 className="name-container">
            {user.get('title')}
          </h1>
        </div>
        <div className="menu-container">
          { boards && boards.map( (item, key) =>
            <ExpandableLink
              key={key}
              title={item.get('title')}
              selected={item.get('slug') === currentBoard}/>
          )}
          <div className="add-board-button-container">
            <Button
              className='brand-blue-bg'
              onClick={onAddBoard}
              rounded={true}>
              Add New Board
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

BoardExplorer.propTypes = {
  user: PropTypes.any,
  boards: PropTypes.any,
  currentBoard: PropTypes.string,
  onAddBoard: PropTypes.func,
}

export default BoardExplorer;
