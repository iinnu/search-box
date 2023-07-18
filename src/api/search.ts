import axios, { AxiosResponse } from 'axios';

import { Sick } from '@/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getRecommendedKeywords(keyword: string): Promise<Sick[]> {
  console.info('calling api');

  const response: AxiosResponse<Sick[]> = await axios.get(`${BASE_URL}?q=${keyword}`);
  response.data.splice(8);
  return response.data;
}
