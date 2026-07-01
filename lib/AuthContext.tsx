'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, authApi } from '@/lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, token: null, isLoading: true });

  useEffect(() => {
    const token = localStorage.getItem('uzum_token');
    const userStr = localStorage.getItem('uzum_user');
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setState({ user, token, isLoading: false });
      } catch {
        setState({ user: null, token: null, isLoading: false });
      }
    } else {
      setState(s => ({ ...s, isLoading: false }));
    }
  }, []);

  const login = async (username: string, password: string) => {
    const data = await authApi.login(username, password);
    const user: User = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      username: data.username,
      image: data.image,
      token: data.accessToken,
    };
    localStorage.setItem('uzum_token', data.accessToken);
    localStorage.setItem('uzum_user', JSON.stringify(user));
    setState({ user, token: data.accessToken, isLoading: false });
  };

  const logout = () => {
    localStorage.removeItem('uzum_token');
    localStorage.removeItem('uzum_user');
    setState({ user: null, token: null, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{
      user: state.user,
      token: state.token,
      isLoading: state.isLoading,
      login,
      logout,
      isAuthenticated: !!state.token,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
