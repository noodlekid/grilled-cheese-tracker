import { FriendStatus } from "../../types";

const mockFriends: FriendStatus[] = [
  {
    userId: "1",
    username: "alex_chen",
    isOnline: true,
    status: "on-run",
    currentRun: "run1",
  },
  { userId: "2", username: "sarah_k", isOnline: true, status: "online" },
  {
    userId: "3",
    username: "mike_92",
    isOnline: true,
    status: "on-run",
    currentRun: "run2",
  },
  { userId: "4", username: "jordan_lee", isOnline: true, status: "online" },
  { userId: "5", username: "pat_smith", isOnline: false, status: "offline" },
];

export function FriendsList() {
  return (
    <div className="friends-list">
      {mockFriends.map((friend) => (
        <div key={friend.userId} className="friend-item">
          <span>{friend.username}</span>
          <span
            className={`friend-status ${friend.status === "on-run" ? "on-run" : friend.status === "online" ? "online" : ""}`}
          ></span>
        </div>
      ))}
    </div>
  );
}
