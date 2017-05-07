import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import { zIndex, colors } from 'material-ui/styles';
import Avatar from 'material-ui/Avatar';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';

import ContentAdd from 'material-ui/svg-icons/content/add';

import './style.css';


const SelectableList = makeSelectable(List);

class BoardExplorer extends Component {

  handleBoardChange(event, slug) {
    if (this.props.onBoardChange && slug !== this.props.currentBoard) {
      this.props.onBoardChange(slug);
    }
  }

  render() {
    const { user, boards, onEditBoard, currentBoard } = this.props;

    const selectedBoard = currentBoard;

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
          <FlatButton
            backgroundColor={colors.cyan500}
            className="add-board-button"
            hoverColor={colors.cyan200}
            rippleColor={colors.cyan700}
            label="Add New Board"
            icon={<ContentAdd color="white"/>}
            onTouchTap={onEditBoard}
          />
          <SelectableList
            value={selectedBoard}
            onChange={this.handleBoardChange.bind(this)}>
            { boards && boards.valueSeq().map((item, key) =>
              <ListItem
                containerElement={
                  <Link to={`/${user.get('slug')}/boards/${item.get('slug')}`} />
                }
                key={key}
                value={item.get('slug')}
                primaryText={item.get('title')}
                initiallyOpen={selectedBoard === item.get('slug')} />
            )}
          </SelectableList>
        </Drawer>
      </div>
    );
  }
}

BoardExplorer.propTypes = {
  user: PropTypes.any,
  boards: PropTypes.any,
  currentBoard: PropTypes.string,
  onEditBoard: PropTypes.func,
  onBoardChange: PropTypes.func,
}

export default BoardExplorer;
