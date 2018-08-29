declare namespace BestMovies.store {
  interface IMovie {}

  interface IMovieFullVersion {
    recommendations?: IMovieRecommendations;
  }

  interface IMovieRecommendations {}

  interface IMovies {
    total_pages: int;
  }

  interface IGenre {
    id: number;
    name: string;
  }

  interface IBaseState {
    genres: Map<number, string>;
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
    loadMovies?(query: string, page: string): Promise<IAction>;
  }
}
