import axios from 'axios';

const baseUrl = 'http://localhost:3001/entries';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request;
}

const createEntry = (entry) => {
  const request = axios({
    method: 'post',
    url: baseUrl,
    data: entry,
    headers: {'Content-Type': 'multipart/form-data'}
  })
  return request;
}

const updateEntry = (id, updatedEntry) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedEntry);
  return request;
}

const entryService = { getAll, createEntry, updateEntry }

export default entryService;