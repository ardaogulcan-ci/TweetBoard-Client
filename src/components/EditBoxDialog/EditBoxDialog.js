import React, { Component, PropTypes } from 'react';
import { fromJS } from 'immutable';

import TextField from 'material-ui/TextField';
import EditDialog from '../../components/EditDialog/EditDialog';

import './style.css';

const initialBox = fromJS({
  title: '',
  description: '',
  refresh: {
    interval: '',
  },
});

class EditBoxDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      box: initialBox,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open,
    })
  }

  handleTextChange(field, event, value) {
    const actualField = field.split('.');

    this.setState({
      box: this.state.box.setIn(actualField, value),
    });
  }

  handleSave() {
    if (this.props.onSave) {
      this.props.onSave(this.state.box);
    }
  }

  render() {
    const box = this.state.box;

    return (
      <EditDialog
        className="edit-box-dialog"
        title="Edit Box"
        onSave={this.handleSave.bind(this)}
        onCancel={this.props.onCancel}
        open={this.state.open}>
        <TextField
          id="title"
          hintText="Write title for the box"
          floatingLabelText="Title"
          floatingLabelFixed={true}
          fullWidth={true}
          value={box.get('title')}
          onChange={this.handleTextChange.bind(this, 'title')}/>
        <TextField
          id="description"
          hintText="Write description for the box"
          floatingLabelText="Description"
          floatingLabelFixed={true}
          fullWidth={true}
          value={box.get('description')}
          onChange={this.handleTextChange.bind(this, 'description')}/>
        <TextField
          id="refresh.interval"
          hintText="Type seconds for refresh interval"
          floatingLabelText="Refresh Interval"
          floatingLabelFixed={true}
          fullWidth={true}
          value={box.getIn(['refresh', 'interval'])}
          onChange={this.handleTextChange.bind(this, 'refresh.interval')}/>
      </EditDialog>
    );
  }
}

EditBoxDialog.propTypes = {
  open: PropTypes.bool,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
}

export default EditBoxDialog;
