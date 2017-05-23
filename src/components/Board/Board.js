import React, { Component, PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ContentAdd from 'material-ui/svg-icons/content/add';
import MenuItem from 'material-ui/MenuItem';

import Box from '../Box/Box';
import MoreMenu from '../MoreMenu/MoreMenu';

import './style.css';

class Board extends Component {

  handleAddBox() {
    if (this.props.onAddBox) {
      this.props.onAddBox(this.props.board.get('_id'));
    }
  }

  render() {
    const board = this.props.board;
    const boxes = board && board.get('boxes');

    return (
      <div className="board-container">
      { board &&
        <div style={{height:'100%'}}>
          <div className="header-container">
            <AppBar
              title={board && board.get('title')}
              iconElementRight={
                <MoreMenu>
                  <MenuItem primaryText="Edit Board" />
                </MoreMenu>
              }
              iconElementLeft={<IconButton onTouchTap={this.props.onCloseBoard}><NavigationClose /></IconButton>}/>
            <div className="tool-box">
              <div className="add-button" onClick={this.handleAddBox.bind(this)}>
                <FloatingActionButton
                  className="icon"
                  zDepth={0}
                  mini={true}
                  secondary={true}>
                  <ContentAdd />
                </FloatingActionButton>
                <h1 className="text">Add New Box</h1>
              </div>
            </div>
          </div>
          <div className="box-container">
            { boxes && boxes.map((box, index) =>
              <Box key={index} box={box} onUpdate={this.props.onUpdateBox} />
            )}
          </div>
        </div>
      }
      </div>
    );
  }
}

Board.PropTypes = {
  board: PropTypes.any,
  onAddBox: PropTypes.func,
  onUpdateBox: PropTypes.func,
  onCloseBoard: PropTypes.func
}

export default Board;
