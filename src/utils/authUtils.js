import useAuthStore from '../store/authStore';

const USER_KEY = 'loggedInUser';

/**
 * Retrieves the logged-in user.
 * If not found in Zustand store, falls back to Local Storage.
 * 
 * @returns {Object|null} - The logged-in user data or null if not found.
 */
export function getUser() {
  const user = useAuthStore.getState().user || JSON.parse(localStorage.getItem(USER_KEY));
  return user;
}

/**
 * Logs out the current user by clearing Zustand state and Local Storage.
 * Redirects to the login page without a full page refresh.
 *
 * @param {Function} navigate - React Router navigate function.
 */
export function logoutUser(navigate) {
  useAuthStore.getState().logout();
  localStorage.removeItem(USER_KEY);
  
  if (navigate) {
    navigate('/login');
  }
}
