// modules/auth/infrastructure/datasources/AuthRemoteDataSource.js
import { api } from '../../../../core/api/axiosConfig';

export class AuthRemoteDataSource {
  async login(email, password) {
    const response = await api.post('/usuarios/login', { email, password });
    return response.data;
  }
}