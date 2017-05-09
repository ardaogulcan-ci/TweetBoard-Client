import React, { Component, PropTypes } from 'react';
import { fromJS } from 'immutable';

import {Tabs, Tab} from 'material-ui/Tabs';
import EditDialog from '../../components/EditDialog/EditDialog';

import SearchQuery from '../SearchQuery/SearchQuery';

import './style.css';

class EditQueryDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      selectedTab: 'search',
      query: fromJS({
        type: 'search',
        term: '',
      }),
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open,
    });
  }

  handleTabChange(value) {
    this.setState({
      selectedTab: value,
      query: this.state.query.set('type', value),
    });
  }

  handleQueryChange(term) {
    this.setState({
      query: this.state.query.set('term', term),
    });
  }

  handleSave() {
    if (this.props.onSave) {
      this.props.onSave(this.state.query);
    }
  }

  render() {
    return (
      <EditDialog
        title="Edit Query"
        bodyClassName="edit-query-dialog"
        onSave={this.handleSave.bind(this)}
        onCancel={this.props.onCancel}
        open={this.state.open}>
        <Tabs
          contentContainerClassName="tabs-container"
          value={this.state.selectedTab}
          onChange={this.handleTabChange.bind(this)}>
          <Tab label="Search" value="search">
            <SearchQuery onChange={this.handleQueryChange.bind(this)}/>
          </Tab>
          <Tab label="Timeline" value="user_timeline">
          </Tab>
          <Tab label="Trending Topic" value="trends">
          </Tab>
        </Tabs>
      </EditDialog>
    );
  }
}

EditQueryDialog.propTypes = {
  open: PropTypes.bool,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
}

export default EditQueryDialog;
