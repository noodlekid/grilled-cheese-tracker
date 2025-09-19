import { create } from "zustand";
import { Node, Edge } from "../types";
import { api } from "../services/api";

interface MapStore {
  nodes: Node[];
  edges: Edge[];
  currentRoute: any;
  viewMode: "2D" | "3D" | "Satellite";
  setViewMode: (mode: "2D" | "3D" | "Satellite") => void;
  fetchMapData: () => Promise<void>;
  calculateRoute: (from: number, to: number) => Promise<void>;
}

export const useMapStore = create<MapStore>((set) => ({
  nodes: [],
  edges: [],
  currentRoute: null,
  viewMode: "3D",

  setViewMode: (mode) => set({ viewMode: mode }),

  fetchMapData: async () => {
    const [nodesRes, edgesRes] = await Promise.all([
      api.get("/map/nodes"),
      api.get("/map/edges"),
    ]);
    set({ nodes: nodesRes.data, edges: edgesRes.data });
  },

  calculateRoute: async (from, to) => {
    const response = await api.get(`/map/route?from=${from}&to=${to}`);
    set({ currentRoute: response.data });
  },
}));
