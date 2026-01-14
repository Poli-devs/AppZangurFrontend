import { User } from '../../domain/entities/User';
import { LoginResponseDto } from '../dtos/UserDto';

export class UserMapper {
  static toDomain(dto: LoginResponseDto['user']): User {
    return {
      id: dto.id,
      email: dto.email,
      name: dto.name,
      role: dto.role,
      isActive: dto.isActive,
      createdAt: new Date(dto.createdAt),
    };
  }
}