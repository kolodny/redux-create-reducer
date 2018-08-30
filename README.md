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
  }

  [ActionTypes.REMOVE_TODO](state, action) {
    return state.filter((_, i) => i !== action.index);
  }

  // All other action types result in state being returned
})
```

[npm-image]: https://img.shields.io/npm/v/redux-create-reducer.svg?style=flat-square
[npm-url]: https://npmjs.org/package/redux-create-reducer
[travis-image]: https://img.shields.io/travis/kolodny/redux-create-reducer.svg?style=flat-square
[travis-url]: https://travis-ci.org/kolodny/redux-create-reducer
[coveralls-image]: https://img.shields.io/coveralls/kolodny/redux-create-reducer.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/kolodny/redux-create-reducer
[downloads-image]: http://img.shields.io/npm/dm/redux-create-reducer.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/redux-create-reducer
