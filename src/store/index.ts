import { applyMiddleware, createStore, Middleware, Store } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers";

import IBaseState = BestMovies.store.IBaseState;
import IState = BestMovies.store.IState;
import IAction = BestMovies.store.IAction;
import TReducer = BestMovies.store.TReducer;

export default (baseState: IBaseState): Store<IState, IAction> => {
  const initialState: IState = {
    loading: false,
    movies: null,
    ...baseState
  };

  const reducer: TReducer = (state, action) =>
    reducers[action.type] ? reducers[action.type](state, action) : state;
  const middlewares: Middleware[] = [thunk];

  if (process.env.NODE_ENV !== "production") {
    middlewares.push(
      createLogger({
        collapsed: true
      })
    );
  }

  return createStore(reducer, initialState, applyMiddleware(...middlewares));
};
