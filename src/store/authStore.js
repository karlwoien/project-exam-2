import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  
  // Setter brukerdata og token ved login
  login: (userData, token) => set({ user: userData, token }),

  // Nullstiller state ved logout
  logout: () => set({ user: null, token: null }),
}));

export default useAuthStore;