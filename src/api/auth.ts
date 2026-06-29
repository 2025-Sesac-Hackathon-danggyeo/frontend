import { apiClient } from './client';
import type { AuthResponse, User } from '../types';

export const authApi = {
  signUp: (data: { username: string; password: string }) =>
    apiClient.post<AuthResponse>('/auth/signup', data),

  login: (data: { username: string; password: string }) =>
    apiClient.post<AuthResponse>('/auth/login', data),

  logout: () =>
    apiClient.post<void>('/auth/logout'),

  me: () =>
    apiClient.get<User>('/auth/me'),
};
