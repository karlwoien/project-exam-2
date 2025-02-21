import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Zustand store for authentication state management.
 *
 * This store handles user authentication, including:
 * - Storing user data and authentication tokens.
 * - Logging in and logging out users.
 * - Updating user profile data.
 *
 * The store persists in local storage under the key `auth-storage`.
 *
 * @property {Object|null} user - The currently logged-in user data.
 * @property {string|null} token - The authentication token.
 * @method login - Logs in a user and stores their data.
 * @method logout - Logs out the user and clears stored data.
 * @method updateProfile - Updates user profile data while preserving existing values.
 */
const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (userData, token) => set({ user: userData, token }),

      logout: () => set({ user: null, token: null }),

      updateProfile: (updatedData) =>
        set((state) => ({
          user: { ...state.user, ...updatedData },
        })),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
