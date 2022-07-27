import axios from 'axios';

import { API_KEY_v3, BASE_URL } from './config';

export default async function getMovieCredits(id?: string, language = 'en-US') {
  const response = await axios.get(`${BASE_URL}/movie/${id}/credits?language=${language}&api_key=${API_KEY_v3}`);
  return response.data;
}
