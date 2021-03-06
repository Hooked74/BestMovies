import { Pagination } from "antd";
import classNames from "class-names";
import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import Search from "../../components/Search/Search";
import Thumbnail from "../../components/Thumbnail/Thumbnail";
import buildActions from "../../store/actions";
import { isIE } from "../../utils";
import styles from "./Gallery.scss";

import IProps = BestMovies.containers.Gallery.IProps;
import IState = BestMovies.containers.Gallery.IState;
import IMovie = BestMovies.store.IMovie;

interface IAdvancedProps extends RouteComponentProps<{ page: string }>, IProps {}

const mapStateToProps = state => ({
  movies: state.movies,
  genres: state.genres
});

class Gallery extends PureComponent<IAdvancedProps, IState> {
  public state: IState = {
    currentPage: parseInt(this.props.match.params.page, 10)
  };

  private executedSearchQuery: string;

  get thumbnailsClassName() {
    return classNames(styles.thumbnails, { [styles.fallback]: isIE });
  }

  get thumbnails(): JSX.Element {
    const { movies, genres } = this.props;

    return movies && movies.total_pages ? (
      <div className={this.thumbnailsClassName}>
        {movies.results.map((movie: IMovie) => (
          <Thumbnail
            key={movie.id}
            poster={movie.poster_path}
            vote={movie.vote_average}
            title={movie.title}
            shortInfo={`${new Date(movie.release_date).getFullYear()}, ${movie.genre_ids
              .map(id => genres.get(id))
              .join(", ")}`}
          />
        ))}
      </div>
    ) : null;
  }

  get pagination(): JSX.Element {
    const { movies } = this.props;

    this.state.currentPage = parseInt(this.props.match.params.page, 10);

    return movies && movies.total_pages ? (
      <div className={styles.pagination}>
        <Pagination
          current={this.state.currentPage}
          total={movies.total_pages}
          onChange={this.onChangePage}
        />
      </div>
    ) : null;
  }

  get content(): JSX.Element {
    const { movies } = this.props;

    return movies && movies.total_results === 0 ? (
      <div className={styles["no-matches"]}>No matches found</div>
    ) : (
      <Fragment>
        {this.thumbnails}
        {this.pagination}
      </Fragment>
    );
  }

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
    return <div className={styles.container}>{this.content}</div>;
  }

  private loadMovies(searchQuery: string) {
    this.executedSearchQuery = searchQuery;
    this.props.loadMovies(this.props.match.params.page, searchQuery);
  }

  private onChangePage = currentPage => {
    this.setState({ currentPage });
    this.props.history.push(`/page/${currentPage}${location.search}`);
  };
}

export default connect(
  mapStateToProps,
  buildActions
)(Gallery);
