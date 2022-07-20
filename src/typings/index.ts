export type Filter = 'all' | 'movies' | 'tv';
export interface Content {
  id: number;
  vote_average: number;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
  profile_path?: string;
  type: 'movie' | 'tv';
  genres: { id: string | number; name: string }[];
  episode_run_time: any[];
  tagline?: string;
  overview?: string;
  release_date?: string;
  runtime?: string;
  status?: string;
  first_air_date?: string;
  last_air_date?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  media_type?: string;
}

export interface Person {
  birthday?: string;
  deathday?: string;
  name?: string;
  gender: number;
  biography?: string;
  popularity: string;
  place_of_birth?: string;
  known_for_department?: string;
}

export interface PersonImage {
  aspect_ratio: number;
  file_path: string | null | undefined;
  height: number;
  width: number;
}

export interface MovieCast {
  adult: boolean;
  gender: number;
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string;
  order: number;
}
export interface MovieCredit {
  id: number;
  cast: MovieCast[];
}
