import { Omit } from "lodash";
import React, { ChangeEvent, KeyboardEvent, PureComponent } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import styles from "./Search.scss";

import IProps = BestMovies.components.Search.IProps;
import IState = BestMovies.components.Search.IState;
import ISearch = BestMovies.components.Search.ISearch;

interface IAdvancedProps extends RouteComponentProps<any>, IProps {}
interface ISearchComponent
  extends React.ComponentClass<Omit<IAdvancedProps, keyof RouteComponentProps<any>>>,
    ISearch {}

class Search extends PureComponent<IAdvancedProps, IState> {
  public static readonly URL_PARAMETER = "q";

  static get query(): string {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(Search.URL_PARAMETER) || "";
  }

  public static getDerivedStateFromProps(nextProps: IAdvancedProps, prevState: IState): IState {
    const query: string = Search.query;
    const { search } = nextProps.location;
    return search !== prevState.search ? { query, search } : prevState;
  }

  public state: IState = {
    query: Search.query,
    search: this.props.location.search
  };

  public render() {
    return <input onKeyDown={this.onKeyDown} value={this.state.query} onChange={this.onChange} />;
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
      const query: string = this.state.query.trim();
      const url: string = `/page/1?${Search.URL_PARAMETER}=${query}`;
      this.props.history.push(url);
    }
  };

  private onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };
}

export default withRouter(Search) as ISearchComponent;
