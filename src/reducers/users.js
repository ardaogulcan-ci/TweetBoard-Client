import { createReducer } from '../helpers/redux';
import { merger } from '../helpers/immutability';
import { fromJS, Map, List } from 'immutable';

const initialState = new Map({});

export default createReducer(initialState, {
  GET_BOARDS_START: (state, { userSlug }) => state.mergeIn([userSlug], fromJS({
    userSlug,
    loading: true,
  })),

  ADD_BOARDS: (state, { userSlug, boards }) => state.updateIn([userSlug], currentState => {
    return currentState.mergeWith(merger, fromJS({
      boards: boards ? fromJS(boards.reduce((acc, item) => {
        acc[item.slug] = item
        return acc;
      }, {})) : new List(),
      loading: false,
      error: null,
    }));
  }),

  GET_BOARDS_ERROR: (state, { userSlug, error }) => state.mergeIn([userSlug], fromJS({
    loading: false,
    valid: false,
    error: error,
  })),

  REMOVE_BOARDS: (state, { userSlug }) => state.delete(userSlug),
});
