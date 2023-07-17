import axios from 'axios';

import { Sick } from '@/types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getRecommendedKeywords(keyword: string): Promise<Sick[]> {
  const response = await axios.get(`${BASE_URL}?q=${keyword}`);
  return response.data;
}
