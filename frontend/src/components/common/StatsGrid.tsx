import { Statistics } from "../../types";

interface StatsGridProps {
  stats: Partial<Statistics>;
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="stats-grid">
      <StatCard value={stats.totalRuns || 0} label="Total Runs" />
      <StatCard
        value={`${(stats.totalDistance || 0) / 1000}km`}
        label="Distance"
      />
      <StatCard value={`$${stats.totalSpent || 0}`} label="Spent" />
      <StatCard value={`${stats.averageTime || 0}m`} label="Avg Time" />
    </div>
  );
}

interface StatCardProps {
  value: string | number;
  label: string;
}

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
