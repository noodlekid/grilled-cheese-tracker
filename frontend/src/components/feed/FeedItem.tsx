import { format } from "date-fns";
import { FeedItem as FeedItemType } from "../../types";

interface FeedItemProps {
  item: FeedItemType;
}

export function FeedItem({ item }: FeedItemProps) {
  const timeString = format(item.timestamp, "HH:mm:ss");

  return (
    <div className="feed-item">
      <div className="feed-time">[{timeString}]</div>
      <div className="feed-message">
        {item.user && <span className="feed-user">{item.user}</span>}
        {item.user && " "}
        {item.message}
      </div>
    </div>
  );
}
