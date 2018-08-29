import classNames from "class-names";
import React, { PureComponent } from "react";
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
  private executedSearchQuery: string;

  get thumbnailsClassName() {
    return classNames(styles.thumbnails, { [styles.fallback]: isIE });
  }

  get thumbnails(): JSX.Element {
    const { movies, genres } = this.props;

    return movies ? (
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
    return <div className={styles.container}>{this.thumbnails}</div>;
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
