import axios from 'axios';

const baseUrl = 'http://localhost:3001/entries';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request;
  // return request.then(entries => entries.data);
}

const entryService = { getAll }

export default entryService;