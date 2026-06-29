import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';

const USERS_KEY = 'mock_users';
const SESSION_KEY = 'mock_session';

interface StoredUser { id: number; username: string; email: string; password: string; }

function getUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}
function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

interface AuthContextType {
  user: User | null;
  initializing: boolean;
  login: (username: string, password: string) => Promise<string | null>;
  logout: () => void;
  signUp: (username: string, password: string) => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (saved) setUser(JSON.parse(saved));
    } catch {}
    setInitializing(false);
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const found = getUsers().find((u) => u.username === username && u.password === password);
    if (!found) return '아이디 또는 비밀번호가 올바르지 않습니다.';
    const u: User = { id: found.id, username: found.username, email: found.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    setUser(u);
    return null;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const signUp = useCallback(async (username: string, password: string) => {
    const users = getUsers();
    if (users.find((u) => u.username === username)) return '이미 사용 중인 아이디입니다.';
    const newUser: StoredUser = { id: Date.now(), username, email: `${username}@sfitz.kr`, password };
    saveUsers([...users, newUser]);
    const u: User = { id: newUser.id, username: newUser.username, email: newUser.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    setUser(u);
    return null;
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
