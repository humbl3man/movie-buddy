import axios from 'axios';
import { API_KEY_v3, BASE_URL } from './config';

export default async function getDetail(params: { type: 'movie' | 'tv'; id: string | undefined }) {
  return axios.get(`${BASE_URL}/${params.type}/${params.id}?api_key=${API_KEY_v3}&language=en-US`);
}
