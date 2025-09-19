import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../services/api";

interface AuthStore {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      login: async (username, password) => {
        const response = await api.post("/auth/login", { username, password });
        const { token, user } = response.data;

        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        set({ token, user, isAuthenticated: true });
      },

      logout: () => {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        set({ token: null, user: null, isAuthenticated: false });
      },

      checkAuth: () => {
        const token = localStorage.getItem("token");
        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          set({ token, isAuthenticated: true });
        }
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
