import React, { PureComponent } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import styles from "./Header.scss";

import IProps = BestMovies.components.Header.IProps;
import IState = BestMovies.components.Header.IState;

export default class Header extends PureComponent<IProps, IState> {
  public render() {
    return (
      <div className={styles.container}>
        <Link to="/page/1">Best Movies</Link>
        <Search />
      </div>
    );
  }
}
