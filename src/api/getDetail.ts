import axios from 'axios';
import { Content } from '../typings';
import { API_KEY_v3, BASE_URL } from './config';

export default async function getDetail(params: { type: 'movie' | 'tv'; id: string | undefined }) {
  const response = await axios.get<Content>(`${BASE_URL}/${params.type}/${params.id}?api_key=${API_KEY_v3}&language=en-US`);
  return response.data;
}
