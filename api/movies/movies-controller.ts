import { api, Query } from "encore.dev/api";
import { moviesService } from "./movies-service";
import { MoviesSearchDto } from "./movies-search.dto";

interface FindMovieQueryParams {
  title: Query<string>;
}

interface FindMovieResponse {
  results?: MoviesSearchDto[];
  error?: string;
}

export const search = api(
  { expose: true, method: "GET", path: "/movies/search" },
  async (params: FindMovieQueryParams): Promise<FindMovieResponse> => {
    const searchResults = await moviesService.search(params.title);

    if (!searchResults) {
      return { error: "Error searching for movie" };
    }

    return { results: searchResults };
  }
);

interface FindMovieStreamsQueryParams {
  id: Query<string>;
}

interface FindMovieStreamsResponse {
  results?: string[];
  error?: string;
}

export const findStreams = api(
  { expose: true, method: "GET", path: "/movies/findStreams" },
  async (
    params: FindMovieStreamsQueryParams
  ): Promise<FindMovieStreamsResponse> => {
    const findStreamsResult = await moviesService.findStreams(
      parseInt(params.id)
    );

    if (!findStreamsResult) {
      return { error: "Error finding streams for movie" };
    }

    return { results: findStreamsResult };
  }
);
