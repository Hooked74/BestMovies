import { Spin } from "antd";
import classNames from "class-names";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import styles from "./Loader.scss";

import IProps = BestMovies.containers.Loader.IProps;
import IState = BestMovies.containers.Loader.IState;

const mapStateToProps = state => ({
  loading: state.loading
});

class Loader extends PureComponent<IProps, IState> {
  get className(): string {
    return classNames(styles.container, { "h-hidden": !this.props.loading });
  }

  public render() {
    return (
      <div className={this.className}>
        <Spin tip="Loading..." />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Loader);
