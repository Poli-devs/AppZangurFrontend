export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
}

export const createUser = (data: Partial<User>): User => ({
  id: data.id || '',
  email: data.email || '',
  name: data.name || '',
  role: data.role || 'user',
  isActive: data.isActive ?? true,
  createdAt: data.createdAt || new Date(),
});