import React, { Component } from 'react';
import{ connect } from 'react-redux';

import BoardExplorer from '../../components/BoardExplorer/BoardExplorer';
import Board from '../../components/Board/Board';

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
