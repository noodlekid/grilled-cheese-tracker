import { create } from "zustand";
import { User, Statistics } from "../types";

interface UserStore {
  user: User | null;
  statistics: Partial<Statistics>;
  setUser: (user: User) => void;
  updateStatistics: (stats: Partial<Statistics>) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  statistics: {
    totalRuns: 42,
    totalDistance: 13700,
    totalSpent: 284,
    averageTime: 8,
  },

  setUser: (user) => set({ user }),
  updateStatistics: (stats) =>
    set((state) => ({
      statistics: { ...state.statistics, ...stats },
    })),
}));
