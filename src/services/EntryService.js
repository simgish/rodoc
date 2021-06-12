import axios from 'axios';

const baseUrl = 'http://localhost:3001/entries';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request;
}

const createEntry = (entry) => {
  const request = axios.post(baseUrl, entry);
  return request;
}

const entryService = { getAll, createEntry }

export default entryService;