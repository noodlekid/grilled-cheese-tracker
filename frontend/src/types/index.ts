export interface User {
  id: string;
  username: string;
  email: string;
  discordId?: string;
  createdAt: Date;
}

export interface Node {
  id: number;
  name: string;
  x: number;
  y: number;
  nodeType: "building" | "intersection" | "destination";
  metadata?: Record<string, any>;
}

export interface Edge {
  id: number;
  fromNodeId: number;
  toNodeId: number;
  distance: number;
  timeSeconds: number;
  pathType: "sidewalk" | "stairs" | "indoor" | "grass";
  isAccessible: boolean;
  weight: number;
}

export interface Run {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  status: RunStatus;
  totalDistance?: number;
  routeTaken?: number[];
  participants: Participant[];
}

export type RunStatus =
  | "planned"
  | "in-progress"
  | "arrived"
  | "ordering"
  | "waiting"
  | "completed"
  | "cancelled";

export interface Participant {
  userId: string;
  username: string;
  role: "organizer" | "companion";
  joinedAt: Date;
}

export interface FeedItem {
  id: string;
  timestamp: Date;
  type: "run_start" | "run_complete" | "status_update" | "system";
  user?: string;
  message: string;
  metadata?: Record<string, any>;
}

export interface Statistics {
  totalRuns: number;
  totalDistance: number;
  totalTimeMinutes: number;
  totalSpent: number;
  favoriteRoute?: string;
  averageTime: number;
}

export interface FriendStatus {
  userId: string;
  username: string;
  isOnline: boolean;
  currentRun?: string;
  status: "online" | "offline" | "on-run";
}
