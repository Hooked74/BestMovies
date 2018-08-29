declare namespace BestMovies.containers.Gallery {
  interface IProps extends BestMovies.store.IActions {
    movies?: BestMovies.store.IMovies;
  }

  interface IState {}
}
