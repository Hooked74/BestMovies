import Types from "./types";

import IState = BestMovies.store.IState;
import IAction = BestMovies.store.IAction;
import IMovies = BestMovies.store.IMovies;

export default {
  [Types.LOAD_NEW_MOVIES](state: IState, action: IAction<{ movies: IMovies }>) {
    return {
      ...state,
      ...action.payload,
      loading: false
    };
  },
  [Types.ENABLE_LOADING](state: IState) {
    return {
      ...state,
      loading: true
    };
  },
  [Types.DISABLE_LOADING](state: IState) {
    return {
      ...state,
      loading: false
    };
  }
};
