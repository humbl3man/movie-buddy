import axios from 'axios';
import { API_KEY_v3, BASE_URL } from './config';

export default async function getPopular(params: { type: 'movie' | 'tv'; page?: number }) {
  const response = await axios.get(`${BASE_URL}/${params.type}/popular?api_key=${API_KEY_v3}&language=en-US&page=${params.page || 1}`);
  return response.data;
}
