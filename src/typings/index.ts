export type Filter = 'all' | 'movies' | 'tv';
export interface Content {
  id: number;
  vote_average: number;
  title?: string;
  name?: string;
  poster_path?: string;
  type: 'movie' | 'tv';
}
