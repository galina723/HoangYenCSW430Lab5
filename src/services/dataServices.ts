import 'react-native-get-random-values';
import axios from 'axios';
import { AuthModel } from '../models/authModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataModel } from '../models/dataModel';

const url = 'https://kami-backend-5rs0.onrender.com';

const connector = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

connector.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export class DataServices {
  static async login(loginData: AuthModel) {
    const res = await connector.post('/auth', loginData);

    if (res.data.token && res.status === 200) {
      await AsyncStorage.setItem('token', res.data.token);
      await AsyncStorage.setItem('user', res.data.name);
    } else {
      return 'fail';
    }

    return res;
  }

  static async getAllService() {
    const res = await connector.get('/services');

    if (res.status === 200) {
      return res;
    }

    return 'fail';
  }

  static async addService(data: DataModel) {
    const res = await connector.post('/services', data);

    if (res.status === 200) {
      return res;
    }

    return 'fail';
  }

  static async getServiceById(id: string) {
    const res = await connector.get(`/services/${id}`);

    if (res.status === 200) {
      return res;
    }

    return 'fail';
  }

  static async updateService(data: DataModel, id: string) {
    const res = await connector.put(`/services/${id}`, data);

    if (res.status === 200) {
      return res;
    }

    return 'fail';
  }

  static async deleteService(id: string) {
    const res = await connector.delete(`/services/${id}`);

    if (res.status === 200) {
      return res;
    }

    return 'fail';
  }
}
