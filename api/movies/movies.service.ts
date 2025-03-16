import { tmdbService } from "../tmdb/tmdb.service";
import { MoviesSearchDto } from "./movies.search.dto";

const search = async (title: string) => {
  const searchResults = await tmdbService.search(title);

  if (!searchResults) {
    return;
  }

  const searchResultsDto: MoviesSearchDto[] = searchResults.results.map(
    (searchResult) => {
      return {
        id: searchResult.id,
        title: searchResult.title,
        description: searchResult.overview,
        releaseDate: searchResult.release_date,
      };
    }
  );

  return searchResultsDto;
};

const findStreams = async (movieId: number) => {
  const searchResults = await tmdbService.findStreams(movieId);

  if (!searchResults?.results.US?.flatrate) {
    return;
  }

  const searchResultsDto = searchResults.results.US.flatrate.map(
    (streamingProvider) => {
      return streamingProvider.provider_name;
    }
  );

  return searchResultsDto;
};

export const moviesService = {
  search,
  findStreams,
};
