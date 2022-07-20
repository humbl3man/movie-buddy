import axios from 'axios';

import { API_KEY_v3, BASE_URL } from './config';

export default async function getPersonCombinedCredits(id?: string) {
  const response = await axios.get(`${BASE_URL}/person/${id}/combined_credits?api_key=${API_KEY_v3}`);
  return response.data;
}
