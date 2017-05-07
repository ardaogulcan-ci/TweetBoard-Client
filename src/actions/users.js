import api from '../configs/api';
import { createAction } from '../helpers/redux';

export const getBoardsStart = createAction('GET_BOARDS_START', 'userSlug');
export const getBoardStart = createAction('GET_BOARD_START', 'userSlug', 'boardSlug');
export const getBoardDetailsStart = createAction('GET_BOARD_DETAILS_START', 'userSlug', 'boardSlug');
export const addBoardStart = createAction('ADD_BOARD_START', 'userSlug');
export const addBoxStart = createAction('ADD_BOX_START', 'userSlug', 'boardSlug');

export const addBoards = createAction('ADD_BOARDS', 'userSlug', 'boards');
export const addBoardDetails = createAction('ADD_BOARD_DETAILS', 'userSlug', 'boardSlug', 'board');
export const addBoxes = createAction('ADD_BOXES', 'userSlug', 'boardSlug', 'boxes');

export const getBoardsError = createAction('GET_BOARDS_ERROR', 'userSlug', 'error');
export const getBoardError = createAction('GET_BOARD_ERROR', 'userSlug', 'boardSlug', 'error');
export const addBoardError = createAction('ADD_BOARD_ERROR', 'userSlug', 'error');
export const addBoxError = createAction('ADD_BOX_ERROR', 'userSlug', 'boardSlug', 'error');

export const removeBoards = createAction('REMOVE_BOARDS', 'userSlug');

export function requestBoards(userSlug, boardSlug) {
  return dispatch => {
    dispatch(getBoardsStart(userSlug));

    return api.getBoardsOfUser(userSlug).then(
      function getBoardsSuccess(response) {
        dispatch(addBoards(userSlug, response));
        if (boardSlug) {
          const board = response.find(board => board.slug === boardSlug);
          dispatch(requestBoardDetails(userSlug, boardSlug, board._id));
        }
      },
      function getBoardsFail(error) {
        dispatch(getBoardsError(userSlug, error));
      }
    );
  }
}

export function requestBoard(userSlug, boardSlug) {
  return dispatch => {
    dispatch(getBoardStart(userSlug, boardSlug));

    return api.getBoardOfUser(userSlug, boardSlug).then(
      function getBoardSuccess(response) {
        dispatch(addBoards(userSlug, [response]));
      },
      function getBoardFail(error) {
        dispatch(getBoardError(userSlug, boardSlug, error));
      }
    );
  }
}

export function requestBoardDetails(userSlug, boardSlug, boardId) {
  return dispatch => {
    dispatch(getBoardDetailsStart(userSlug, boardSlug));

    return api.getBoard(boardId).then(
      function getBoardSuccess(response) {
        dispatch(addBoardDetails(userSlug, boardSlug, response));
      },
      function getBoardFail(error) {
        dispatch(getBoardError(userSlug, boardSlug, error));
      }
    )
  }
}

export function requestSaveBoard(userSlug, board) {
  return dispatch => {
    dispatch(addBoardStart(userSlug));

    return api.saveBoard(board.toJS()).then(
      function saveBoardSuccess(response) {
        dispatch(addBoards(userSlug, [response]));
      },
      function saveBoardFail(error) {
        dispatch(addBoardError(userSlug, error));
      }
    )
  }
}

export function requestSaveBox(userSlug, boardSlug, boardId, box) {
  return dispatch => {
    dispatch(addBoxStart(userSlug, boardSlug));

    return api.saveBox(boardId, box.toJS()).then(
      function saveBoxSuccess(response) {
        dispatch(addBoxes(userSlug, boardSlug, response));
      },
      function saveBoxFail(error) {
        dispatch(addBoxError(userSlug, boardSlug, error));
      }
    )
  }
}