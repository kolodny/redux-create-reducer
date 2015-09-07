"use strict";

exports.createReducer = function createReducer(initialState, handlers) {
  return function reducer(state, action) {
    if (state === undefined) state = initialState;

    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};
