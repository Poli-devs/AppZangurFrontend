import { IAuthRepository, LoginCredentials } from '../repositories/IAuthRepository';
import { User } from '../entities/User';

export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(credentials: LoginCredentials): Promise<User> {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }
    return this.authRepository.login(credentials);
  }
}