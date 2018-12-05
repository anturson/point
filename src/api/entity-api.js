import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:9006',
});

export const get = () => client.get('/entities').then(res => res.data);

export const getById = id => client.get(`/entities/${id}`).then(res => res.data);

export const post = data => client.post('/entities', data).then(res => res.data);

export const put = (id, data) => client.put(`/entities/${id}`, data).then(res => res.data);

export const patch = (id, data) => client.patch(`/entities/${id}`, data).then(res => res.data);

export const remove = id => client.delete(`/entities/${id}`).then(res => res.data);
