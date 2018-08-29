import { Layout } from "antd";
import React, { PureComponent } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Search from "../Search/Search";
import styles from "./Header.scss";

import IProps = BestMovies.components.Header.IProps;
import IState = BestMovies.components.Header.IState;

interface IAdvancedProps extends RouteComponentProps<any>, IProps {}

class Header extends PureComponent<IAdvancedProps, IState> {
  public render() {
    return (
      <Layout.Header className={styles.container}>
        <Link to="/page/1">
          <img src={logo} className={styles.logo} />
        </Link>
        <Search />
      </Layout.Header>
    );
  }
}

export default withRouter(Header);
