import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useFeedStore } from "../store/feedStore";
import { useRunStore } from "../store/runStore";

export function useWebSocket() {
  const socketRef = useRef<Socket | null>(null);
  const { addFeedItem } = useFeedStore();
  const { updateRunStatus } = useRunStore();

  useEffect(() => {
    const socket = io(import.meta.env.VITE_WS_URL || "ws://localhost:8080", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("WebSocket connected");
    });

    socket.on("feed:update", (item) => {
      addFeedItem(item);
    });

    socket.on("run:status", (data) => {
      updateRunStatus(data.status);
    });

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [addFeedItem, updateRunStatus]);

  return socketRef.current;
}
