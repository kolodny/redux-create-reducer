import { Action, AnyAction, Reducer } from 'redux';

export interface Handlers<S, A extends Action = AnyAction> {
    [actionType: string]: Reducer<S, A>;
}

export declare function createReducer<S, A extends Action = AnyAction>(initialState: S, handlers: Handlers<S, A>): Reducer<S, A>;
