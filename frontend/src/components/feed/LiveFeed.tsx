import { useEffect, useState } from "react";
import { FeedItem } from "./FeedItem";
import { useFeedStore } from "../../store/feedStore";
import { FeedItem as FeedItemType } from "../../types";

export function LiveFeed() {
  const { feedItems, addFeedItem } = useFeedStore();

  // Simulate live updates
  useEffect(() => {
    const sampleMessages = [
      { user: "jake_m", message: "completed a run (5min 12s)" },
      { user: "emma_w", message: "is ordering..." },
      {
        user: null,
        message: "Warning: Construction on Main Path - rerouting suggested",
      },
      { user: "chris_t", message: "started a group run (3 people)" },
      { user: null, message: "Peak hours detected: +2min wait time expected" },
    ];

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const msg =
          sampleMessages[Math.floor(Math.random() * sampleMessages.length)];
        addFeedItem({
          id: Date.now().toString(),
          timestamp: new Date(),
          type: msg.user ? "status_update" : "system",
          user: msg.user || undefined,
          message: msg.message,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [addFeedItem]);

  return (
    <div className="status-feed" id="status-feed">
      {feedItems.slice(0, 10).map((item) => (
        <FeedItem key={item.id} item={item} />
      ))}
    </div>
  );
}
