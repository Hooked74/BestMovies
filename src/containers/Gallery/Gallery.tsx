import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import Search from "../../components/Search/Search";
import buildActions from "../../store/actions";

import IProps = BestMovies.containers.Gallery.IProps;
import IState = BestMovies.containers.Gallery.IState;

interface IAdvancedProps extends RouteComponentProps<{ page: string }>, IProps {}

const mapStateToProps = state => ({
  movies: state.movies
});

class Gallery extends PureComponent<IAdvancedProps, IState> {
  private executedSearchQuery: string;

  public componentDidMount() {
    this.loadMovies(Search.query);
  }

  public componentDidUpdate(prevProps: IAdvancedProps) {
    const searchQuery: string = Search.query;

    if (
      this.props.match.params.page !== prevProps.match.params.page ||
      searchQuery !== this.executedSearchQuery
    ) {
      this.loadMovies(searchQuery);
    }
  }

  public render() {
    return <div>Gallery</div>;
  }

  private loadMovies(searchQuery: string) {
    this.executedSearchQuery = searchQuery;
    this.props.loadMovies(this.props.match.params.page, searchQuery);
  }
}

export default connect(
  mapStateToProps,
  buildActions
)(Gallery);
