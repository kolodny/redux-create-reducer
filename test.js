var expect = require('expect');
var createReducer = require('./').createReducer;

describe('createReducer', function() {

  it('returns the inital state on the first call with no matches', function() {
    var reducerMap = {};
    var reducer = createReducer('theintialstate', reducerMap);
    expect(reducer(undefined, {type: 'YOLO'})).toEqual('theintialstate');
  });

  it('returns the correct state on the first call with a matche', function() {
    var reducerMap = {
      YOLO: function() {
        return 'theproperstate';
      }
    };
    var reducer = createReducer('theintialstate', reducerMap);
    expect(reducer(undefined, {type: 'YOLO'})).toEqual('theproperstate');
  });

  it('returns the same state if no value matched', function() {
    var reducerMap = {};
    var reducer = createReducer({someObj: true}, reducerMap);
    var state = reducer(undefined, {type: 'YOLO'});
    expect(reducer(state, {type: 'YOLO'})).toEqual(state);
  });

  it('returns a new state if a value matched', function() {
    var reducerMap = {
      YOLO: function() {
        return {someObj: 2};
      }
    };
    var reducer = createReducer({someObj: 1}, reducerMap);
    var state = reducer(undefined, {});
    expect(reducer(state, {type: 'YOLO'})).toEqual({someObj: 2});
  });

  it('warns about undefined action type names, but keeps them intact', function() {
    var YOLO = undefined;
    var reducerMap = {
      [YOLO]: function() {
        return 'theproperstate';
      }
    };
    var spy = expect.spyOn(console, 'warn')
    var reducer = createReducer({}, reducerMap);
    spy.restore();
    expect(spy).toHaveBeenCalled()
    expect(reducer(undefined, {type: 'undefined'})).toEqual('theproperstate');
  });

  it('does not warn about undefined action type names if not in development mode', function() {
    var NODE_ENV = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    delete require.cache[require.resolve('./')];

    // locally scoped version, should be fine
    var createReducer = require('./').createReducer;

    var YOLO = undefined;
    var reducerMap = {
      [YOLO]: function() {
        return 'theproperstate';
      }
    };
    var spy = expect.spyOn(console, 'warn')
    var reducer = createReducer({}, reducerMap);
    process.env.NODE_ENV = NODE_ENV;
    spy.restore();
    expect(spy).toNotHaveBeenCalled()
  });

});
