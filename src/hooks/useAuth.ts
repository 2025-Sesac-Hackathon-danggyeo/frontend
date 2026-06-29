import { useState, useCallback } from 'react';
import { authApi } from '../api/auth';
import type { User } from '../types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { token, user } = await authApi.signUp({ username, password });
      localStorage.setItem('token', token);
      setUser(user);
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : '회원가입에 실패했습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { token, user } = await authApi.login({ username, password });
      localStorage.setItem('token', token);
      setUser(user);
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : '로그인에 실패했습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout().catch(() => {});
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  return { user, loading, error, signUp, login, logout };
}
