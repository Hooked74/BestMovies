import { sync, urlResolve } from "../utils";

import IMovieFullVersion = BestMovies.store.IMovieFullVersion;
import IMovieRecommendations = BestMovies.store.IMovieRecommendations;
import IMovies = BestMovies.store.IMovies;
import IGenre = BestMovies.store.IGenre;

class MovieAPIManager {
  private readonly token: string = "a1229a0274a1cb728efcf1d43ddb9cf8";

  private readonly host: string = "https://api.themoviedb.org/";
  private readonly version: string = "3";
  private readonly baseURL: URL = urlResolve(this.host, `${this.version}/`) as URL;

  // Methods
  private readonly popularMoviesMethod: URL = urlResolve(this.baseURL, "movie/popular") as URL;
  private readonly searchMoviesMethod: URL = urlResolve(this.baseURL, "search/movie") as URL;
  private readonly genresMethod: URL = urlResolve(this.baseURL, "genre/movie/list") as URL;
  private readonly movieDetailsMethod: URL = urlResolve(this.baseURL, "movie/") as URL;

  public resolveImage(name: string, width: number = 200) {
    return `https://image.tmdb.org/t/p/w${width}${name}`;
  }

  public getPopularMovies(page: string): Promise<IMovies> {
    return this.fetchMovies(this.popularMoviesMethod, page);
  }

  public findMovies(page: string, query: string): Promise<IMovies> {
    this.searchMoviesMethod.searchParams.set("query", query);
    return this.fetchMovies(this.searchMoviesMethod, page);
  }

  public async getGenres(): Promise<Map<int, string>> {
    const { genres } = await this.fetch<{ genres: IGenre[] }>(
      this.genresMethod,
      "Couldn't get genre list"
    );

    // prettier-ignore
    return new Map(genres.map((genre: IGenre) => [
      genre.id,
      genre.name
    ]) as Array<[int, string]>);
  }

  public async getMovieDetails(id: int): Promise<IMovieFullVersion> {
    const [details, recommendations] = await Promise.all([
      this.fetch<IMovieFullVersion>(
        urlResolve(this.movieDetailsMethod, `${id}`) as URL,
        `Couldn't get information about the movie - ${id}`
      ),
      this.fetch<IMovieRecommendations>(
        urlResolve(this.movieDetailsMethod, `${id}/`, "recommendations") as URL,
        `Couldn't get recommendations for the movie - ${id}`
      )
    ]);

    details.recommendations = recommendations;
    return details;
  }

  private fetchMovies(url: URL, page: string): Promise<IMovies> {
    url.searchParams.set("page", page);
    return this.fetch<IMovies>(url, "Couldn't get movie list");
  }

  private async fetch<T>(url: URL, error?: string): Promise<T> {
    this.appendToken(url);

    const response: Response = await sync(new Request(url as any, { mode: "cors" }), error);
    return response.json();
  }

  private appendToken(url: URL) {
    if (!url.searchParams.has("api_key")) {
      url.searchParams.append("api_key", this.token);
    }
  }
}

export default new MovieAPIManager();
