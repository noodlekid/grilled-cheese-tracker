import { NavLink } from "react-router-dom";
import { Panel } from "./Panel";
import { StatsGrid } from "../common/StatsGrid";
import { useUserStore } from "../../store/userStore";

export function Sidebar() {
  const { statistics } = useUserStore();

  const navItems = [
    { path: "/", label: "Map View" },
    { path: "/run", label: "Start Run" },
    { path: "/stats", label: "Statistics" },
    { path: "/history", label: "Run History" },
    { path: "/friends", label: "Friends" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <aside className="sidebar">
      <Panel title="NAVIGATION">
        <div style={{ padding: 0 }}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </Panel>

      <Panel title="QUICK STATS" style={{ marginTop: "1.5rem" }}>
        <StatsGrid stats={statistics} />
      </Panel>
    </aside>
  );
}
