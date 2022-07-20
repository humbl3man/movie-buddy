import axios from 'axios';

import { API_KEY_v3, BASE_URL } from './config';

export type getPersonDetailProps = {
  id: string | undefined;
  language?: string;
};

export default async function getPersonDetail({ id, language = 'en-US' }: getPersonDetailProps) {
  const response = await axios.get(`${BASE_URL}/person/${id}?api_key=${API_KEY_v3}&language=${language}`);
  return response.data;
}
