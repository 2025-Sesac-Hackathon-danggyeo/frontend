import { apiClient } from './client';
import type { PracticeSession } from '../types';

export const practiceApi = {
  start: (scriptId: number, sentenceText: string) =>
    apiClient.post<PracticeSession>('/practice', { scriptId, sentenceText }),

  uploadAudio: (sessionId: number, audioBlob: Blob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    return apiClient.upload<PracticeSession>(`/practice/${sessionId}/audio`, formData);
  },

  getResult: (sessionId: number) =>
    apiClient.get<PracticeSession>(`/practice/${sessionId}`),

  getHistory: (scriptId: number) =>
    apiClient.get<PracticeSession[]>(`/scripts/${scriptId}/practice`),
};
