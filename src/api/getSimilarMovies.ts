import axios from 'axios';
import { API_KEY_v3, BASE_URL } from './config';

export default async function getSimilarMovies(movieId: number) {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY_v3}&adult=false`);
    return response.data.results;
  } catch (err: any) {
    console.error('error getting similar movies', err);
  }
}
