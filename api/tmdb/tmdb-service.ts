import log from "encore.dev/log";

///                                  ///
///              Private             ///
///                                  ///

const BASE_URL = "https://api.themoviedb.org/3";

const apiFetch = async <T>(url: string): Promise<T | undefined> => {
  try {
    const request = await fetch(url, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTNhYmI4MTFjOTExYjcxNmQxMjQyOTM1YmQyYWU2ZSIsIm5iZiI6MTc0MjE1NzM4Mi41OTYsInN1YiI6IjY3ZDczNjQ2ZDgwMjMwOTcwM2YxNjk5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vqedhF_XgUWI9459yOCsgLax3Jfa0wNRCPaVGjCWk3o`,
      },
    });
    return request.json() as Promise<T>;
  } catch (e) {
    log.error(e);
    return;
  }
};

///                                  ///
///              Search              ///
///                                  ///

interface MovieSearchResults {
  results: MovieSearchResult[];
  total_pages: number;
  total_results: number;
}

interface MovieSearchResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const search = async (title: string) => {
  const url = `${BASE_URL}/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;

  return apiFetch<MovieSearchResults>(url);
};

///                                  ///
///           Find Streams           ///
///                                  ///

export interface FindStreamResults {
  id: number;
  results: FindStreamResult;
}

interface FindStreamResult {
  US:
    | {
        link: string;
        flatrate:
          | {
              logo_path: string;
              provider_id: number;
              provider_name: string;
              display_priority: number;
            }[]
          | undefined;
      }
    | undefined;
}

const findStreams = async (movieId: number) => {
  const url = `${BASE_URL}/movie/${movieId}/watch/providers`;

  return apiFetch<FindStreamResults>(url);
};

export const tmdbService = {
  search,
  findStreams,
};
