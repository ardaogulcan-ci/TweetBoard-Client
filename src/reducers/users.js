import { createReducer } from '../helpers/redux';
import { merger } from '../helpers/immutability';
import { fromJS, Map, List } from 'immutable';

const initialState = new Map({});

export default createReducer(initialState, {
  GET_BOARDS_START: (state, { userSlug }) => state.mergeIn([userSlug], fromJS({
    userSlug,
    loading: true,
  })),

  GET_BOARD_START: (state, { userSlug, boardSlug }) => state.setIn([userSlug, 'boards', boardSlug], fromJS({
    boardSlug,
    loading: true,
  })),

  GET_BOARD_DETAILS_START: (state, { userSlug, boardSlug }) =>
    state.setIn([userSlug, 'boards', boardSlug, 'loading'], true),

  ADD_BOARD_START: (state, { userSlug }) => state.mergeIn([userSlug], fromJS({
    userSlug,
    loading: true,
    addingNew: true,
  })),

  ADD_BOX_START: (state, { userSlug, boardSlug }) => state.mergeIn([userSlug, 'boards', boardSlug], fromJS({
    loading: true,
    addingNew: true,
  })),

  ADD_BOARDS: (state, { userSlug, boards }) => state.updateIn([userSlug], currentState => {
    return currentState.mergeWith(merger, fromJS({
      boards: boards ? fromJS(boards.reduce((acc, item) => {
        acc[item.slug] = item
        return acc;
      }, {})) : new List(),
      loading: false,
      addingNew: false,
      error: null,
    }));
  }),

  ADD_BOARD_DETAILS: (state, { userSlug, boardSlug, board }) => state.setIn([userSlug, 'boards', boardSlug], fromJS({
    ...board,
    loading: false,
    error: null,
  })),

  ADD_BOXES: (state, { userSlug, boardSlug, boxes }) => state.mergeIn([userSlug, 'boards', boardSlug], fromJS({
    boxes: fromJS(boxes),
    loading: false,
    addingNew: false,
    error: null,
  })),

  GET_BOARDS_ERROR: (state, { userSlug, error }) => state.mergeIn([userSlug], fromJS({
    loading: false,
    valid: false,
    error: error,
  })),

  GET_BOARD_ERROR: (state, { userSlug, boardSlug, error }) => state.setIn([userSlug, 'boards', boardSlug], fromJS({
    loading: false,
    valid: false,
    error: error,
  })),

  ADD_BOARD_ERROR: (state, { userSlug, error }) => state.mergeIn([userSlug], fromJS({
    loading: false,
    valid: false,
    addingNew: false,
    error: error,
  })),

  ADD_BOX_ERROR: (state, { userSlug, boardSlug, error }) => state.mergeIn([userSlug, 'boards', boardSlug], fromJS({
    loading: false,
    valid: false,
    addingNew: false,
    error: error,
  })),

  REMOVE_BOARDS: (state, { userSlug }) => state.delete(userSlug),
});
