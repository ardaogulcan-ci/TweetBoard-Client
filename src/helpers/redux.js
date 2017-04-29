export function createAction(type, ...argList) {
  return function(...args) {
    let action = { type };

    argList.forEach((arg, index) => {
      action[argList[index]] = args[index];
    });

    return action;
  }
}

export function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  }
}
