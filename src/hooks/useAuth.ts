import { useState, useCallback } from 'react';
import type { AuthState } from '../types/user';
import { googleAuthService } from '../services/googleAuth';
import { toast } from 'sonner';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Initialize from localStorage to avoid cascading renders
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return {
        user: JSON.parse(storedUser),
        isLoading: false,
        isAuthenticated: true,
      };
    }
    return {
      user: null,
      isLoading: false,
      isAuthenticated: false,
    };
  });

  const login = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const user = await googleAuthService.login();
      localStorage.setItem('user', JSON.stringify(user));
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
      toast.success(`Bem-vindo, ${user.name}!`);
    } catch {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      toast.error("Falha na autenticação com o Google.");
    }
  }, []);

  const logout = useCallback(async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      await googleAuthService.logout();
      localStorage.removeItem('user');
      setAuthState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
      toast.info("Você saiu do sistema.");
    } catch {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      toast.error("Erro ao sair.");
    }
  }, []);

  return {
    ...authState,
    login,
    logout,
  };
};
