export type Filter = 'all' | 'movies' | 'tv';
export interface Content {
  id: number;
  vote_average: number;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
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
}
