import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { Store } from "redux";
import BestMovies from "./containers/BestMovies/BestMovies";
import "./critical-polyfills";
import createStore from "./store";
import "./style/index.scss";
import { isIE } from "./utils";

import IState = BestMovies.store.IState;
import IAction = BestMovies.store.IAction;

class BootManager {
  private static readonly ROOT_ID: string = "root";
  private static readonly ROOT_CONTAINER_PATH: string = "./containers/BestMovies/BestMovies";

  public async setup(): Promise<void> {
    await this.applyPolyfills();

    const root: HTMLElement = this.createRootElement();
    const providerComponent: JSX.Element = this.createProviderComponent(createStore());

    document.appendChild(root);

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
