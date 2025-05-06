export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN_CABANG = 'admin_cabang',
  OWNER_CABANG = 'owner_cabang',
  USER = 'user'
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: Role;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
  branchId?: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  phone: string;
  role?: Role;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  user: User;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
} 