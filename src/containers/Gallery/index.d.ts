declare namespace BestMovies.containers.Gallery {
  interface IProps extends BestMovies.store.IActions {
    movies?: BestMovies.store.IMovies;
    genres?: Map<int, string>;
  }

  interface IState {
    currentPage: number;
  }
}
