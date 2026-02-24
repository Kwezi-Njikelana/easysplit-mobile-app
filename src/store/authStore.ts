import { create } from 'zustand';
import { User } from '../types';
import { isValidElement } from 'react';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (fullName: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    setUser: (user: User) => void;

}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // TODO: Implement real authentication
      // For now, use demo user
      const demoUser: User = {
        id: '1',
        email,
        fullName: 'Demo User',
        createdAt: new Date().toISOString(),
      };
      set({ user: demoUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  signup: async (email: string, password: string, fullName: string) => {
    set({ isLoading: true });
    try {
      // TODO: Implement real signup
      const newUser: User = {
        id: Date.now().toString(),
        email,
        fullName,
        createdAt: new Date().toISOString(),
      };
      set({ user: newUser, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  
  setUser: (user: User) => {
    set({ user, isAuthenticated: true });
  },
}));