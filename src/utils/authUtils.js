import useAuthStore from '../store/authStore';

const USER_KEY = 'loggedInUser';

// Hent bruker fra Zustand store eller Local Storage (fallback)
export function getUser() {
  const user = useAuthStore.getState().user || JSON.parse(localStorage.getItem(USER_KEY));
  return user;
}

// Logg ut bruker via Zustand og fjerne Local Storage
export function logoutUser(redirect = true) {
  useAuthStore.getState().logout();
  localStorage.removeItem(USER_KEY);

  if (redirect) {
    window.location.href = '/login';
  }
}
