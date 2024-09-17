import axios from 'axios';
import { headers } from 'next/headers';

const createServerAxiosInstance = () => {
  const instance = axios.create({
    baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use((config) => {
    const headersList = headers();
    config.headers['Cookie'] = headersList.get('cookie');
    config.headers['Host'] = headersList.get('host');
    return config;
  });

  return instance;
};

const serverAxios = createServerAxiosInstance();

export default serverAxios;
