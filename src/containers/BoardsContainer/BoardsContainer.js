import React, { Component } from 'react';
import{ connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { SHARE_TYPE } from '../../helpers/enums';
import BoardExplorer from '../../components/BoardExplorer/BoardExplorer';
import Board from '../../components/Board/Board';
import EditDialog from '../../components/EditDialog/EditDialog';

import { requestBoards } from '../../actions/users';

import './style.css';

class BoardsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAddBoardDialog: false,
    }
  }

  componentDidMount() {
    if (!this.props.user) {
      return;
    }

    const { userSlug } = this.props.params;

    this.props.dispatch(requestBoards(userSlug));
  }

  getBoards() {
    const users = this.props.users;

    if(!users) {
      return;
    }

    return  users.getIn([this.props.params.userSlug, 'boards']);

  }

  handleAddBoard() {
    this.setState({
      showAddBoardDialog: true,
    })
  }

  render() {
    const { user, params } = this.props;
    const boards = this.getBoards();

    return (
      <div className="boards-container">
        <BoardExplorer
          user={user}
          boards={boards}
          currentBoard={params.boardSlug}
          onAddBoard={this.handleAddBoard.bind(this)}></BoardExplorer>
        <Board></Board>
        <EditDialog title="Add New Board" open={this.state.showAddBoardDialog}>
            <TextField
              id="boardTitle"
              hintText="Give a title for the board"
              floatingLabelText="Board Title"
              floatingLabelFixed={true}
              fullWidth={true} />
            <SelectField
              id="sharedType"
              hintText="Select how you want to share this board"
              floatingLabelText="Sharing Type"
              floatingLabelFixed={true}
              autoWidth={false}
              style={{width: '100%'}}>
              { Object.keys(SHARE_TYPE).map( (key, index) =>
                <MenuItem key={index} value={SHARE_TYPE[key]} primaryText={key} />
              )}
            </SelectField>
        </EditDialog>
      </div>
    );
  }
}

export default connect(
  state => ({
    authentication: state.authentication,
    user: state.authentication.get('user'),
    users: state.users,
  })
)(BoardsContainer)
