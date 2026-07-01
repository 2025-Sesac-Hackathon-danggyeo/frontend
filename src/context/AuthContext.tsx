import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { authApi } from '../api/auth';

interface AuthContextType {
  user: User | null;
  initializing: boolean;
  login: (id: string, password: string) => Promise<string | null>;
  logout: () => void;
  signUp: (id: string, password: string) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('user');
      if (saved) setUser(JSON.parse(saved));
    } catch {}
    setInitializing(false);
  }, []);

  const login = useCallback(async (id: string, password: string) => {
    try {
      const { token, user } = await authApi.login({ id, password });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return null;
    } catch (e) {
      return e instanceof Error ? e.message : '로그인에 실패했습니다.';
    }
  }, []);

  const logout = useCallback(async () => {
    await authApi.logout().catch(() => {});
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const signUp = useCallback(async (id: string, password: string) => {
    try {
      const { token, user } = await authApi.signUp({ id, password });
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      return null;
    } catch (e) {
      return e instanceof Error ? e.message : '회원가입에 실패했습니다.';
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, initializing, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}
