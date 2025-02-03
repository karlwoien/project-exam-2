const USER_KEY = "loggedInUser";

// Lagre brukerdata i Local Storage
export function saveUserToLocalStorage(userData) {
    localStorage.setItem(USER_KEY, JSON.stringify({
        name: userData.name,
        email: userData.email,
        avatar: userData.avatar?.url || "",
        banner: userData.banner?.url || "",
        accessToken: userData.accessToken, 
        venueManager: userData.venueManager || false,
    }));
}

// Hent brukerdata fra Local Storage
export function getUserFromLocalStorage() {
    const userData = JSON.parse(localStorage.getItem(USER_KEY)) || null;
    return userData;
}

// Fjern brukerdata fra Local Storage
export function removeUserFromLocalStorage(redirect = true) {
    localStorage.removeItem(USER_KEY);

    if (redirect) {
        window.location.href = "/login";
    }
}