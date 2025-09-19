import { Panel } from '../components/layout/Panel';
import { CampusMap } from '../components/map/CampusMap';
import { RunControls } from '../components/run/RunControls';

export function Dashboard() {
  return (
    <>
      <Panel 
        title="CAMPUS MAP - A* PATHFINDING ENABLED"
        headerExtra={
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            NODE COUNT: 47 | EDGE COUNT: 112
          </span>
        }
      >
        <CampusMap />
      </Panel>
      
      <Panel title="RUN CONTROLS" style={{ marginTop: '1.5rem' }}>
        <RunControls />
      </Panel>
    </>
  );
}
