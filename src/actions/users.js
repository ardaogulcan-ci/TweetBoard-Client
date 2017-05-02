import api from '../configs/api';
import { createAction } from '../helpers/redux';

export const getBoardsStart = createAction('GET_BOARDS_START', 'userSlug');
export const addBoards = createAction('ADD_BOARDS', 'userSlug', 'boards');
export const getBoardsError = createAction('GET_BOARDS_ERROR', 'userSlug', 'error');
export const removeBoards = createAction('REMOVE_BOARDS', 'userSlug');

export function requestBoards(userSlug) {
  return dispatch => {
    dispatch(getBoardsStart(userSlug));

    return api.getBoardsOfUser(userSlug).then(
      function getBoardsSuccess(response) {
        dispatch(addBoards(userSlug, response.data));
      },
      function getBoardsFail(error) {
        dispatch(getBoardsError(userSlug, error));
      }
    );
  }
}