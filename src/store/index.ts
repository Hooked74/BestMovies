import { applyMiddleware, createStore, Middleware, Store } from "redux";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers";

import IState = BestMovies.store.IState;
import IAction = BestMovies.store.IAction;
import TReducer = BestMovies.store.TReducer;

export default (): Store<IState, IAction> => {
  const initialState: IState = {};
  const reducer: TReducer = (state, action) =>
    reducers[action.type] ? reducers[action.type](state, action) : state;
  const middlewares: Middleware[] = [thunk];

  if (process.env.NODE_ENV !== "production") {
    middlewares.push(
      (createLogger as any)({
        collapsed: true
      })
    );
  }

  return createStore(reducer, initialState, applyMiddleware(...middlewares));
};
