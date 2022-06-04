import axios from 'axios';

import { API_KEY_v3, BASE_URL } from './config';

export type getSimilarProps = {
  type: 'movie' | 'tv';
  id: number;
  page?: number;
};
export default async function getSimilar({ id, type, page = 1 }: getSimilarProps) {
  try {
    const response = await axios.get(`${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY_v3}&page=${page}adult=false`);
    return response.data.results;
  } catch (err: any) {
    console.error('error getting similar content', err);
  }
}
