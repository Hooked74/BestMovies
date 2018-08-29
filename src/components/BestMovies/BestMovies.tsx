// tslint:disable:jsx-no-lambda
import { Layout } from "antd";
import React from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Gallery from "../../containers/Gallery/Gallery";
import Loader from "../../containers/Loader/Loader";
import Preview from "../../containers/Preview/Preview";
import Header from "../Header/Header";
import RedirectToPage from "../RedirectToPage/RedirectToPage";
import Search from "../Search/Search";
import styles from "./BestMovies.scss";

export default () => (
  <Router>
    <Layout>
      <Header />
      <Layout.Content className={styles.content}>
        <Switch>
          <Route
            path="/page/:page"
            render={props =>
              !Search.query && !!location.search ? (
                <Redirect to={`/page/${props.match.params.page}`} />
              ) : (
                <Gallery {...props} />
              )
            }
          />
          <Route path="/movie/:id" component={Preview} />
          <Route component={RedirectToPage} />
        </Switch>
      </Layout.Content>
      <Layout.Footer className={styles.footer}>Best Movies ©2018 Created by Hooked</Layout.Footer>
      <Loader />
    </Layout>
  </Router>
);
