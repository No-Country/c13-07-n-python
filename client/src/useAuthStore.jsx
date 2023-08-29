import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false, 
    userRole: null, 
    login: (access, refresh) => set({ accessToken: access, refreshToken: refresh, isLoggedIn: true }),
    logout: () => set({ accessToken: null, refreshToken: null, isLoggedIn: false, userRole: null }),
    setUserRole: (role) => set({ userRole: role }),
  }));