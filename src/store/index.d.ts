declare namespace BestMovies.store {
  const enum Types {}

  interface IState {}

  interface IAction<T = any, U = any> {
    type: Types;
    payload?: T;
    error?: U;
  }

  type TReducer = (state: IState, action: IAction) => IState;
}
