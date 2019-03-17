import { createReducer } from './'

interface Action {
  type: string;
}

interface State {
  value: number;
}

class Reset implements Action {
  readonly type = 'Reset Action';
}
class AddOne implements Action {
  readonly type = 'AddOne Action';
}
class AddCustom implements Action {
  readonly type = 'AddCustom Action';
  constructor(public readonly value: number) { }
}

type Actions = Reset | AddOne | AddCustom;

const reducer = createReducer<State, Actions>({ value: 0 }, {
  'Reset Action': (state, action) => ({ value: 0 }),
  'AddOne Action': (state, action) => ({ value: state.value + 1 }),
  'AddCustom Action': (state, action) => ({ value: state.value + action.value }),
});

type ActionsWithoutAddOne = Exclude<Actions, AddOne>
const reducerThatDoesNotHandleAddOne = createReducer<State, ActionsWithoutAddOne>({ value: 0 }, {
  'Reset Action': (state, action) => ({ value: 0 }),
  'AddCustom Action': (state, action) => ({ value: state.value + action.value }),
});




// Make sure the old usage still works:

const ActionTypes = {
  ADD_TODO: 'ADD TODO',
  REMOVE_TODO: 'REMOVE TODO'
}
const initialState = [];

export const todos = createReducer(initialState, {
  [ActionTypes.ADD_TODO](state, action) {
    const text = action.text.trim();
    return [...state, text];
  },

  [ActionTypes.REMOVE_TODO](state, action) {
    return state.filter((_, i) => i !== action.index);
  }

  // All other action types result in state being returned
});
