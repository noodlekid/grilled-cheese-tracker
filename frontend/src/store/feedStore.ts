import { create } from "zustand";
import { FeedItem } from "../types";

interface FeedStore {
  feedItems: FeedItem[];
  addFeedItem: (item: FeedItem) => void;
  clearFeed: () => void;
}

export const useFeedStore = create<FeedStore>((set) => ({
  feedItems: [
    {
      id: "1",
      timestamp: new Date(),
      type: "status_update",
      user: "alex_chen",
      message: "started a run to Grilled Cheese Shop",
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 240000),
      type: "run_complete",
      user: "sarah_k",
      message: "arrived at destination (4min 32s)",
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 480000),
      type: "system",
      message: "New fastest route discovered: Library → GCS (2min 15s)",
    },
  ],

  addFeedItem: (item) =>
    set((state) => ({
      feedItems: [item, ...state.feedItems].slice(0, 50), // Keep last 50 items
    })),

  clearFeed: () => set({ feedItems: [] }),
}));
