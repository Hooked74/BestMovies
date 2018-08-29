declare namespace BestMovies.store {
  interface IMovie {
    backdrop_path: string;
    genre_ids: int[];
    id: int;
    original_title: string;
    overview: string;
    popularity: string;
    poster_path: string;
    release_date: string;
    title: string;
    vote_average: float;
    vote_count: int;
  }

  interface IMovieFullVersion {
    recommendations?: IMovieRecommendations;
  }

  interface IMovieRecommendations {}

  interface IMovies {
    total_pages: int;
    results: IMovie[];
  }

  interface IGenre {
    id: int;
    name: string;
  }

  interface IBaseState {
    genres: Map<int, string>;
  }

  interface IState extends IBaseState {
    loading: boolean;
    movies: IMovies;
  }

  interface IAction<T = any, U = any> {
    type: int;
    payload?: T;
    error?: U;
  }

  type TReducer = (state: IState, action: IAction) => IState;

  interface IActions {
    loadMovies?(query: string, page: string): (dispatch) => Promise<void>;
  }
}
