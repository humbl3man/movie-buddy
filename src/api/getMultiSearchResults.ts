import axios from 'axios';
import { Content } from '../typings';
import { API_KEY_v3, BASE_URL } from './config';

interface GetMultiSearchResultsParams {
  query: string;
}

interface SearchResults {
  page: number;
  results: Content[];
  total_pages: number;
  total_results: number;
}

export default async function getMultiSearchResults({ query }: GetMultiSearchResultsParams) {
  const response = await axios.get<SearchResults>(`${BASE_URL}/search/multi?api_key=${API_KEY_v3}&query=${query}`);
  return response.data;
}
