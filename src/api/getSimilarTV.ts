import axios from 'axios';
import { API_KEY_v3, BASE_URL } from './config';

export default async function getSimilarTV(tvId: number) {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${tvId}/similar?api_key=${API_KEY_v3}`);
    return response.data.results;
  } catch (err: any) {
    console.error('error getting similar TV shows', err);
  }
}
