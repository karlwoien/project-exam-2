import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      // Setter brukerdata og token ved login
      login: (userData, token) => set({ user: userData, token }),

      // Nullstiller state ved logout
      logout: () => set({ user: null, token: null }),

      // Oppdater brukerprofil
      updateProfile: (updatedData) =>
        set((state) => ({
          user: { ...state.user, ...updatedData },
        })),
    }),
    {
      name: 'auth-storage', // Lagrer brukerdata i Local Storage
    }
  )
);

export default useAuthStore;
