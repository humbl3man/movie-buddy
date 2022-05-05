import axios from 'axios';
import { API_KEY_v3, BASE_URL } from './config';

interface GetMultiSearchResultsParams {
  query: string;
}

export default async function getMultiSearchResults({ query }: GetMultiSearchResultsParams) {
  return await axios.get(`${BASE_URL}/search/multi?api_key=${API_KEY_v3}&query=${query}`);
}
