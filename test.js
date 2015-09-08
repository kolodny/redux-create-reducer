var expect = require('expect');
var createReducer = require('./').createReducer;

describe('createReducer', function() {

  it('returns the inital state on the first call with no matches', function() {
    const reducerMap = {};
    const reducer = createReducer('theintialstate', reducerMap);
    expect(reducer(undefined, {type: 'YOLO'})).toEqual('theintialstate');
  });

  it('returns the correct state on the first call with a matche', function() {
    const reducerMap = {
      YOLO: function() {
        return 'theproperstate';
      }
    };
    const reducer = createReducer('theintialstate', reducerMap);
    expect(reducer(undefined, {type: 'YOLO'})).toEqual('theproperstate');
  });

  it('returns the same state if no value matched', function() {
    const reducerMap = {};
    const reducer = createReducer({someObj: true}, reducerMap);
    const state = reducer(undefined, {type: 'YOLO'});
    expect(reducer(state, {type: 'YOLO'})).toEqual(state);
  });

  it('returns a new state if a value matched', function() {
    const reducerMap = {
      YOLO: function() {
        return {someObj: 2};
      }
    };
    const reducer = createReducer({someObj: 1}, reducerMap);
    const state = reducer(undefined, {});
    expect(reducer(state, {type: 'YOLO'})).toEqual({someObj: 2});
  });

});
