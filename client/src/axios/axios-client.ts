import axios from 'axios';

const createClientAxiosInstance = () => {
  return axios.create({
    baseURL: '/',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const clientAxios = createClientAxiosInstance();

export default clientAxios;
