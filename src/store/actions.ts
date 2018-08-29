// tslint:disable:no-console
import { bindActionCreators } from "redux";
import MovieAPIManager from "./MovieAPIManager";
import Types from "./types";

const actions = {
  updateQuery() {
    //
  },
  loadMovies(page: string, query: string) {
    return async dispatch => {
      dispatch({
        type: Types.ENABLE_LOADING
      });

      try {
        dispatch({
          type: Types.LOAD_NEW_MOVIES,
          payload: {
            movies: await (query
              ? MovieAPIManager.findMovies(page, query)
              : MovieAPIManager.getPopularMovies(page))
          }
        });
      } catch (e) {
        console.warn(e);
        dispatch({
          type: Types.DISABLE_LOADING
        });
      }
    };
  }
};

export default dispatcher => bindActionCreators(actions, dispatcher);
