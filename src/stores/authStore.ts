import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const getInitialState = () => {
  // Check local storage for the initial login state
  const storedState = localStorage.getItem("isLoggedIn");
  return storedState ? JSON.parse(storedState) : false;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: getInitialState(),
  login: () => {
    set({ isLoggedIn: true });
    localStorage.setItem("isLoggedIn", JSON.stringify(true)); // Persist to local storage
  },
  logout: () => {
    set({ isLoggedIn: false });
    localStorage.setItem("isLoggedIn", JSON.stringify(false)); // Persist to local storage
  },
}));