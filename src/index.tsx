// tslint:disable:jsx-no-lambda
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Store } from "redux";
import Header from "./components/Header/Header";
import RedirectToPage from "./components/RedirectToPage/RedirectToPage";
import Search from "./components/Search/Search";
import Gallery from "./containers/Gallery/Gallery";
import Preview from "./containers/Preview/Preview";
import "./critical-polyfills";
import createStore from "./store";
import MovieAPIManager from "./store/MovieAPIManager";
import "./style/index.scss";
import { isIE } from "./utils";

import IState = BestMovies.store.IState;
import IAction = BestMovies.store.IAction;

const BestMovies = () => (
  <Router>
    <Fragment>
      <Header />,
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
    </Fragment>
  </Router>
);

class BootManager {
  private static readonly ROOT_ID: string = "root";
  private static readonly ROOT_CONTAINER_PATH: string = "./containers/BestMovies/BestMovies";

  public async setup(): Promise<void> {
    await this.applyPolyfills();

    const root: HTMLElement = this.createRootElement();
    const store: Store<IState, IAction> = createStore({
      genres: await MovieAPIManager.getGenres()
    });
    const providerComponent: JSX.Element = this.createProviderComponent(store);

    document.body.appendChild(root);

    ReactDOM.render(providerComponent, root);
    this.applyHotReload(providerComponent, root);
  }

  private createRootElement(): HTMLElement {
    const element: HTMLElement = document.createElement("div");
    element.id = BootManager.ROOT_ID;

    return element;
  }

  private createProviderComponent(store: Store<IState, IAction>): JSX.Element {
    return (
      <Provider store={store}>
        <BestMovies />
      </Provider>
    );
  }

  private applyHotReload(providerComponent: JSX.Element, node: HTMLElement) {
    if (module.hot) {
      module.hot.accept(BootManager.ROOT_CONTAINER_PATH, () => {
        ReactDOM.render(<AppContainer>{providerComponent}</AppContainer>, node);
      });
    }
  }

  private async applyPolyfills(): Promise<void> {
    if (isIE) await import("./polyfills");
  }
}

new BootManager().setup();
