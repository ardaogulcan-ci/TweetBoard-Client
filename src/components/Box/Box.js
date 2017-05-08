import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import MoreMenu from '../MoreMenu/MoreMenu';

import './style.css';

class Box extends Component {

  handleAddQuery() {

  }

  render() {
    const box = this.props.box;
    const queries = box && box.get('queries');
    return (
      <Paper zDepth={1} className="box">
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={box.get('title')} />
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <MoreMenu>
              <MenuItem primaryText="Add Query" />
              <MenuItem primaryText="Edit Board" />
              <MenuItem primaryText="Delete" />
            </MoreMenu>
          </ToolbarGroup>
        </Toolbar>
        { (!queries || (queries && queries.size === 0 )) &&
          <div className="empty" oncClick={this.handleAddQuery.bind(this)}>
            <FloatingActionButton className="icon" zDepth={0} mini={true}>
              <ContentAdd />
            </FloatingActionButton>
            <div className="text">This box needs some queries, <br/>click to add</div>
          </div>
        }
      </Paper>
    );
  }
}

Box.propTypes = {
  box: PropTypes.any,
}

export default Box;