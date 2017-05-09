import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import MoreMenu from '../MoreMenu/MoreMenu';

import EditQueryDialog from '../EditQueryDialog/EditQueryDialog';
import QueryViewer from '../QueryViewer/QueryViewer';

import './style.css';

class Box extends Component {

  constructor(props) {
    super(props);
    this.state = {
      box: this.props.box,
      showEditQueryDialog: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.box) {
      this.setState({
        box: nextProps.box,
      });
    }
  }

  handleAddQuery() {
    this.setState({
      showEditQueryDialog: true,
    })
  }

  handleEditQuerySave(query) {
    const updatedBox = this.state.box.set('queries', this.state.box.get('queries').push(query));

    this.setState({
      box: updatedBox
    });

    if (this.props.onUpdate) {
      this.props.onUpdate(updatedBox);
    }

    this.handleEditQueryClose();
  }

  handleEditQueryClose() {
    this.setState({
      showEditQueryDialog: false,
    })
  }


  render() {
    const box = this.state.box;
    const queries = box && box.get('queries');
    return (
      <Paper zDepth={1} className="box">
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={box && box.get('title')} />
          </ToolbarGroup>
          <ToolbarGroup lastChild={true}>
            <MoreMenu>
              <MenuItem primaryText="Add Query" />
              <MenuItem primaryText="Edit Box" />
              <MenuItem primaryText="Delete" />
            </MoreMenu>
          </ToolbarGroup>
        </Toolbar>
        <div className="query-container">
          { (!queries || (queries && queries.size === 0 )) &&
            <div className="empty" onClick={this.handleAddQuery.bind(this)}>
              <FloatingActionButton
                className="icon"
                zDepth={0}
                mini={true}>
                <ContentAdd />
              </FloatingActionButton>
              <div className="text">This box needs some queries, <br/>click to add</div>
            </div>
          }
          { queries && queries.map((query, index) =>
            <QueryViewer query={query} key={index} />
          )}
        </div>
        <EditQueryDialog
          open={this.state.showEditQueryDialog}
          onSave={this.handleEditQuerySave.bind(this)}
          onCancel={this.handleEditQueryClose.bind(this)} />
      </Paper>
    );
  }
}

Box.propTypes = {
  box: PropTypes.any,
  onUpdate: PropTypes.func,
}

export default Box;