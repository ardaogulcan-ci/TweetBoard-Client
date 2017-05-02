import React, { Component, PropTypes } from 'react';

import { zIndex } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Drawer from 'material-ui/Drawer';

import Button from '../Button/Button';

import './style.css';


const SelectableList = makeSelectable(List);

class BoardExplorer extends Component {

  render() {
    const { user, boards, onAddBoard } = this.props;

    return (
      <div className="board-explorer">
        <Drawer
        className="menu-container"
        docked={true}
        open={true}
        containerStyle={{zIndex: zIndex.drawer - 100}} >
          { user &&
            <SelectableList value={null}>
              <ListItem
                primaryText={user.get('title')}
                leftAvatar={
                  <Avatar
                    src={user.getIn(['profile', 'picture'])}
                  />
                } />
            </SelectableList>
          }
          <SelectableList
            value={null}>
            { boards && boards.map( (item, key) =>
              <ListItem
                primaryText={item.get('title')}
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem primaryText="Share Board" value="share" />,
                  <ListItem primaryText="Delete board" value="delete" />,
                ]} />
            )}
          </SelectableList>
          <div className="add-board-button-container">
            <Button
              className='brand-blue-bg'
              onClick={onAddBoard}
              rounded={true}>
              Add New Board
            </Button>
          </div>
        </Drawer>
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
