import { apiClient } from './client';
import type { Script, ScriptDetail } from '../types';

export const scriptsApi = {
  getAll: () =>
    apiClient.get<Script[]>('/scripts'),

  getById: (id: number) =>
    apiClient.get<ScriptDetail>(`/scripts/${id}`),

  create: (data: { title: string; content: string }) =>
    apiClient.post<Script>('/scripts', data),

  update: (id: number, data: Partial<Pick<Script, 'title' | 'content'>>) =>
    apiClient.put<Script>(`/scripts/${id}`, data),

  delete: (id: number) =>
    apiClient.delete<void>(`/scripts/${id}`),
};
