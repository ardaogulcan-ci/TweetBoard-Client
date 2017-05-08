import React, { Component, PropTypes } from 'react';
import { fromJS } from 'immutable';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

import EditDialog from '../../components/EditDialog/EditDialog';
import { SHARE_TYPE, SHARE_TYPE_DESCRIPTION } from '../../helpers/enums';

import './style.css';

const initialNewUser = fromJS({
  user: '',
  privileges: {
    isAdmin: false,
    read: true,
    write: false,
    share: false,
  }
});

const initialBoard = fromJS({
  users: [],
  shared: {
    type: 'private',
  },
  title: '',
});

class EditBoardDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
      newUser: initialNewUser,
      board: initialBoard,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open,
    })
  }

  handleTitleChange(event, value) {
    this.setState({
      board: this.state.board.set('title', value),
    })
  }

  handleSelectChange(field, event, index, value) {
    this.setState({
      board: this.state.board.setIn(['shared', 'type'], value)
    })
  }

  handleNewUserText(event, value) {
    this.setState({
      newUser: this.state.newUser.set('user', value),
    })
  }

  handleNewUserPrivileges(field, event, value) {
    if ( (field === 'isAdmin' && value) ||
        (field !== 'isAdmin' && this.state.newUser.getIn(['privileges', 'isAdmin']))) {
      this.setState({
        newUser: this.state.newUser.set('privileges',fromJS({
          isAdmin: true,
          read: true,
          write: true,
          share: true,
        })),
      })

      return;
    }

    this.setState({
      newUser: this.state.newUser.setIn(['privileges', field], value),
    })
  }

  handleNewUserAdd() {
    const updatedBoard = this.state.board.set('users', this.state.board.get('users').unshift(this.state.newUser));
    this.setState({
      board: updatedBoard,
      newUser: initialNewUser,
    })
  }

  handleUserText(index, event, value) {
    this.setState({
      board: this.state.board.setIn(['users', index, 'user'], value),
    })
  }

  handleUserPrivileges(index, field, event, value) {
    if ( (field === 'isAdmin' && value) ||
        (field !== 'isAdmin' && this.state.board.getIn(['users', index, 'privileges', 'isAdmin']))) {
      this.setState({
        board: this.state.board.setIn(['users', index, 'privileges'], fromJS({
          isAdmin: true,
          read: true,
          write: true,
          share: true,
        })),
      })

      return;
    }

    this.setState({
      board: this.state.board.setIn(['users', index, 'privileges', field], value),
    })
  }

  handleUserRemove(index) {
    this.setState({
      board: this.state.board.set('users', this.state.board.get('users').delete(index)),
    })
  }

  handleSave() {
    if (this.props.onSave) {
      this.props.onSave(this.state.board);
    }
  }

  render() {
    const { board, newUser } = this.state;
    const sharedType = this.state.board.getIn(['shared', 'type']);
    return (
      <EditDialog
        className="edit-board-dialog"
        title="Edit New Board"
        onSave={this.handleSave.bind(this)}
        onCancel={this.props.onCancel}
        open={this.state.open}>
          <TextField
            id="title"
            hintText="Give a title for the board"
            floatingLabelText="Board Title"
            floatingLabelFixed={true}
            defaultValue={board.get('title')}
            onChange={this.handleTitleChange.bind(this)}
            fullWidth={true} />
          <SelectField
            id="sharedType"
            hintText="Select how you want to share this board"
            floatingLabelText="Sharing Type"
            floatingLabelFixed={true}
            autoWidth={false}
            value={sharedType}
            onChange={this.handleSelectChange.bind(this, 'sharedType')}
            style={{width: '100%'}}>
            { Object.keys(SHARE_TYPE).map( (key, index) =>
              <MenuItem key={index} value={SHARE_TYPE[key]} primaryText={`${key} - ${SHARE_TYPE_DESCRIPTION[key]}`} />
            )}
          </SelectField>
          { sharedType === SHARE_TYPE.USER &&
            <div className="add-user-box">
              <div className="input-box">
                <TextField
                  className="email-input"
                  id="user"
                  hintText="Write email of the user"
                  floatingLabelText="User email"
                  floatingLabelFixed={true}
                  value={newUser.get('user')}
                  onChange={this.handleNewUserText.bind(this)} />
                <div className="privileges-input">
                  <Checkbox
                    label="Admin"
                    checked={newUser.getIn(['privileges' , 'isAdmin'])}
                    onCheck={this.handleNewUserPrivileges.bind(this, 'isAdmin')} />
                  <Checkbox
                    label="Write"
                    checked={newUser.getIn(['privileges', 'write'])}
                    onCheck={this.handleNewUserPrivileges.bind(this, 'write')} />
                  <Checkbox
                    label="Share"
                    checked={newUser.getIn(['privileges', 'share'])}
                    onCheck={this.handleNewUserPrivileges.bind(this, 'share')} />
                </div>
                <div className="confirm-input">
                  <FloatingActionButton
                    mini={true}
                    zDepth={0}
                    onTouchTap={this.handleNewUserAdd.bind(this)}>
                    <ContentAdd />
                  </FloatingActionButton>
                </div>
              </div>
              <div className="listBox">
              { board.get('users') && board.get('users').map((user, index) =>
                <div className="input-box" key={index}>
                  <TextField
                    className="email-input"
                    id="user"
                    hintText="Write email of the user"
                    floatingLabelText="User email"
                    floatingLabelFixed={true}
                    value={user.get('user')}
                    onChange={this.handleUserText.bind(this, index)} />
                  <div className="privileges-input">
                    <Checkbox
                      label="Admin"
                      checked={user.getIn(['privileges' , 'isAdmin'])}
                      onCheck={this.handleUserPrivileges.bind(this, index, 'isAdmin')}/>
                    <Checkbox
                      label="Write"
                      checked={user.getIn(['privileges', 'write'])}
                      onCheck={this.handleUserPrivileges.bind(this, index, 'write')}/>
                    <Checkbox
                      label="Share"
                      checked={user.getIn(['privileges', 'share'])}
                      onCheck={this.handleUserPrivileges.bind(this, index, 'share')}/>
                  </div>
                  <div className="confirm-input">
                    <FloatingActionButton
                      mini={true}
                      secondary={true}
                      zDepth={0}
                      onTouchTap={this.handleUserRemove.bind(this, index)}>
                      <ContentRemove />
                    </FloatingActionButton>
                  </div>
                </div>
              )}
              </div>
            </div>
          }
      </EditDialog>
    );
  }
}

EditBoardDialog.propTypes = {
  open: PropTypes.bool,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
}

export default EditBoardDialog;
