import axios from 'axios';
import { perPage } from './index.js';

const API_KEY = '35947614-59445043f240dd573a474c2aa';
const API_URL = 'https://pixabay.com/api/';

async function getImage(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: perPage,
  });

  const url = `${API_URL}?${params.toString()}`;
  const { data } = await axios.get(url);

  return data;
}

export default getImage;
