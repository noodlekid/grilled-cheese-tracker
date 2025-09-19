import { Panel } from "./Panel";
import { LiveFeed } from "../feed/LiveFeed";
import { FriendsList } from "../friends/FriendsList";

export function RightSidebar() {
  return (
    <aside className="right-sidebar">
      <Panel title="LIVE FEED" showLoader>
        <LiveFeed />
      </Panel>

      <Panel title="FRIENDS ONLINE (5)" style={{ marginTop: "1.5rem" }}>
        <FriendsList />
      </Panel>
    </aside>
  );
}
