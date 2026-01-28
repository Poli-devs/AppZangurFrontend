// modules/auth/domain/usecases/LoginUseCase.js
export class LoginUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }
  
  async execute(email, password) {
    // Validaciones de negocio aquí
    if (!email || !password) {
      throw new Error('Email y contraseña son requeridos');
    }
    return this.authRepository.login(email, password);
  }
}