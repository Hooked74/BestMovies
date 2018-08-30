declare namespace BestMovies.components.Search {
  interface IProps {}

  interface IState {
    query: string;
    search: string;
  }

  interface ISearch {
    readonly URL_PARAMETER: string;
    readonly query: string;
  }
}
