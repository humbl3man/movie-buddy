import axios from 'axios';

import { API_KEY_v3, BASE_URL } from './config';

export default async function getPersonImage(id?: string) {
  const response = await axios.get(`${BASE_URL}/person/${id}/images?api_key=${API_KEY_v3}`);
  return response.data;
}
