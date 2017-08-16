interface Action {
    type: string;
}

export type Reducer<S, A extends Action> = (state: S, action: A) => S;

interface Handlers<S> {
    [actionType: string]: Reducer<S, Action>;
}

export declare function createReducer<S>(initialState: S, handlers: Handlers<S>): Reducer<S, Action>;