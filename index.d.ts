interface Action<T = any> {
    type: T;
}
interface AnyAction extends Action {
    [extraProps: string]: any;
}
declare type Reducer<S, A> = (state: S, action: A) => S;
declare type Handlers<S, A extends Action = AnyAction> = {
    [K in A['type']]: Reducer<S, A extends Action<K> ? A : never>;
};

export declare function createReducer<S, A extends Action = AnyAction>(
    initialState: S,
    handlers: Handlers<S, A>,
): (state: S | undefined, action: A) => S;
export {}
