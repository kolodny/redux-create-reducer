# redux-create-reducer

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Downloads][downloads-image]][downloads-url]

[This code packaged as a node module](http://redux.js.org/docs/recipes/ReducingBoilerplate.html#generating-reducers)

Usage:

```js
import { createReducer } from 'redux-create-reducer';
import * as ActionTypes from '../constants/ActionTypes';

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
})
```

## Typescript typings

This library also provides powerful typescript typings when using Action classes:

```ts
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

// If you wanted to exclude some actions you can use the `Exclude` type.
type ActionsWithoutAddOne = Exclude<Actions, AddOne>
const reducerThatDoesNotHandleAddOne = createReducer<State, ActionsWithoutAddOne>({ value: 0 }, {
  'Reset Action': (state, action) => ({ value: 0 }),
  'AddCustom Action': (state, action) => ({ value: state.value + action.value }),
});
```
[Stackblitz](https://stackblitz.com/edit/typescript-b5ekwc?file=index.ts)

Removing `'Reset Action': (state, action) => ({ value: 0 }),` in the reducer causes the error: `Property '"Reset Action"' is missing in type ...`. Similarly, adding `'Nonexisting Action': (state, action) => ({ value: 0 }),` causes the type error: `Object literal may only specify known properties, and ''Nonexisting Action'' does not exist in type 'Handlers<State, Actions>'.ts(2345)`

[npm-image]: https://img.shields.io/npm/v/redux-create-reducer.svg?style=flat-square
[npm-url]: https://npmjs.org/package/redux-create-reducer
[travis-image]: https://img.shields.io/travis/kolodny/redux-create-reducer.svg?style=flat-square
[travis-url]: https://travis-ci.org/kolodny/redux-create-reducer
[coveralls-image]: https://img.shields.io/coveralls/kolodny/redux-create-reducer.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/kolodny/redux-create-reducer
[downloads-image]: http://img.shields.io/npm/dm/redux-create-reducer.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/redux-create-reducer
