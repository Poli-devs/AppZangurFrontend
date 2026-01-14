import { api } from '../../../../core/api/axiosConfig';
import { LoginRequestDto, LoginResponseDto } from '../dtos/UserDto';
import { LoginCredentials } from '../../domain/repositories/IAuthRepository';

export class AuthRemoteDataSource {
  async login(credentials: LoginCredentials): Promise<LoginResponseDto> {
    const dto: LoginRequestDto = {
      email: credentials.email,
      password: credentials.password,
    };
    
    const response = await api.post<LoginResponseDto>('/usuarios/login', dto);
    return response.data;
  }
}