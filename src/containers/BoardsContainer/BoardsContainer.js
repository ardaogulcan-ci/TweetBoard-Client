import React, { Component } from 'react';
import{ connect } from 'react-redux';

import BoardExplorer from '../../components/BoardExplorer/BoardExplorer';
import Board from '../../components/Board/Board';
import EditBoardDialog from '../../components/EditBoardDialog/EditBoardDialog';
import EditBoxDialog from '../../components/EditBoxDialog/EditBoxDialog';

import { requestBoards, requestBoardDetails, requestSaveBoard, requestSaveBox } from '../../actions/users';

import './style.css';

class BoardsContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userSlug: props.params.userSlug,
      boardSlug: props.params.boardSlug,
      showEditBoardDialog: false,
      showEditBoxDialog: false,
      boards: undefined,
      selectedBoard: undefined,
    }
  }

  componentDidMount() {
    this.props.dispatch(requestBoards(this.state.userSlug, this.state.boardSlug));
  }

  getBoardDetails(userSlug, boardSlug, boardId) {
    this.props.dispatch(
      requestBoardDetails(userSlug, boardSlug, boardId)
    );
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.users) {
      return;
    }
    const users = nextProps.users;
    const boards = users.getIn([this.state.userSlug, 'boards']);

    if (!boards) {
      return;
    }

    let selectedBoard;
    if (this.state.boardSlug) {
      selectedBoard = boards.get(this.state.boardSlug);
    }

    this.setState({
      boards: boards,
      selectedBoard: selectedBoard,
    })
  }

  handleBoardChange(value) {
    this.getBoardDetails(this.state.userSlug, value, this.state.boards.getIn([value, '_id']));
    this.setState({
      boardSlug: value,
    });
  }

  handleEditBoard() {
    this.setState({
      showEditBoardDialog: true,
    })
  }

  handleEditBox(boardId) {
    this.setState({
      showEditBoxDialog: true,
    })
  }

  handleEditBoardSave(board) {
    this.props.dispatch(requestSaveBoard(this.state.userSlug, board));
    this.handleEditBoardClose();
  }

  handleUpdateBox(box) {
    this.props.dispatch(requestSaveBox(this.state.userSlug,
      this.state.boardSlug, this.state.selectedBoard.get('_id'), box));
  }

  handleEditBoxSave(box) {
    this.props.dispatch(requestSaveBox(this.state.userSlug,
      this.state.boardSlug, this.state.selectedBoard.get('_id'), box));
    this.handleEditBoxClose();
  }

  handleEditBoardClose() {
    this.setState({
      showEditBoardDialog: false,
    })
  }

  handleEditBoxClose() {
    this.setState({
      showEditBoxDialog: false,
    })
  }

  render() {
    const { user } = this.props;
    const { boards, selectedBoard } = this.state;

    return (
      <div className="boards-container">
        <BoardExplorer
          user={user && user}
          boards={boards && boards}
          currentBoard={selectedBoard && selectedBoard.get('slug')}
          onEditBoard={this.handleEditBoard.bind(this)}
          onBoardChange={this.handleBoardChange.bind(this)}/>
        <Board
          board={selectedBoard && selectedBoard}
          onAddBox={this.handleEditBox.bind(this)}
          onUpdateBox={this.handleUpdateBox.bind(this)}/>
        <EditBoardDialog
          open={this.state.showEditBoardDialog}
          onSave={this.handleEditBoardSave.bind(this)}
          onCancel={this.handleEditBoardClose.bind(this)} />
        <EditBoxDialog
          open={this.state.showEditBoxDialog}
          onSave={this.handleEditBoxSave.bind(this)}
          onCancel={this.handleEditBoxClose.bind(this)} />
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
