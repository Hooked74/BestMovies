import MovieAPIManager from "../MovieAPIManager";

describe("MovieAPIManager", () => {
  test("should return all popular movies with incorrect page", async () => {
    const movies: any = await MovieAPIManager.getPopularMovies("mock");
    expect(movies.total_pages).toBeGreaterThan(0);
    expect(movies.page).toBe(1);
  });

  test("should return a list of genres", async () => {
    const genres: any = await MovieAPIManager.getGenres();
    expect(genres).toBeInstanceOf(Map);
    expect(genres.size).toBeGreaterThan(0);
  });

  test("should return a list of genres", async () => {
    const mock = 299536;
    const details: any = await MovieAPIManager.getMovieDetails(mock);

    expect(details.id).toBe(mock);
    expect(details).toHaveProperty("recommendations");
    expect(details.recommendations.total_pages).toBeGreaterThan(0);
  });

  test("should throw an exception when the movie ID is not valid", async () => {
    await expect(MovieAPIManager.getMovieDetails(1)).rejects.toThrow();
  });
});
