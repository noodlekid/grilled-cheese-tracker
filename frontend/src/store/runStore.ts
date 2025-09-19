import { create } from "zustand";
import { Run, RunStatus } from "../types";
import { api } from "../services/api";

interface RunStore {
  currentRun: Run | null;
  todaysRunCount: number;
  startRun: () => Promise<void>;
  updateRunStatus: (status: RunStatus) => Promise<void>;
  endRun: () => Promise<void>;
  fetchTodaysRuns: () => Promise<void>;
}

export const useRunStore = create<RunStore>((set, get) => ({
  currentRun: null,
  todaysRunCount: 0,

  startRun: async () => {
    const response = await api.post("/runs/start");
    set({ currentRun: response.data });
  },

  updateRunStatus: async (status: RunStatus) => {
    const { currentRun } = get();
    if (!currentRun) return;

    const response = await api.patch(`/runs/${currentRun.id}/status`, {
      status,
    });
    set({ currentRun: response.data });
  },

  endRun: async () => {
    const { currentRun } = get();
    if (!currentRun) return;

    await api.patch(`/runs/${currentRun.id}/end`);
    set({ currentRun: null });
    get().fetchTodaysRuns();
  },

  fetchTodaysRuns: async () => {
    const response = await api.get("/runs/today");
    set({ todaysRunCount: response.data.count });
  },
}));
