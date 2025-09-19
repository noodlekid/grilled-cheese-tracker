import { useState } from "react";
import { Panel } from "../components/layout/Panel";
import { Button } from "../components/common/Button";
import { useRunStore } from "../store/runStore";
import { useNavigate } from "react-router-dom";

export function RunTracker() {
  const navigate = useNavigate();
  const { startRun, currentRun, updateRunStatus } = useRunStore();
  const [isStarting, setIsStarting] = useState(false);

  const handleStartRun = async () => {
    setIsStarting(true);
    try {
      await startRun();
      navigate("/");
    } catch (error) {
      console.error("Failed to start run:", error);
    } finally {
      setIsStarting(false);
    }
  };

  if (currentRun) {
    return (
      <Panel title="RUN IN PROGRESS">
        <div className="run-status">
          <h2>Status: {currentRun.status}</h2>
          <p>Started: {new Date(currentRun.startTime).toLocaleTimeString()}</p>

          <div className="run-actions">
            <Button onClick={() => updateRunStatus("arrived")}>
              Arrived at Shop
            </Button>
            <Button onClick={() => updateRunStatus("ordering")}>
              Ordering
            </Button>
            <Button onClick={() => updateRunStatus("waiting")}>
              Waiting for Order
            </Button>
            <Button
              variant="primary"
              onClick={() => updateRunStatus("completed")}
            >
              Complete Run
            </Button>
          </div>
        </div>
      </Panel>
    );
  }

  return (
    <Panel title="START NEW RUN">
      <div className="run-setup">
        <h2>Ready for a Grilled Cheese Run?</h2>

        <div className="run-options">
          <label>
            <input type="checkbox" /> Invite friends
          </label>
          <label>
            <input type="checkbox" /> Use fastest route
          </label>
          <label>
            <input type="checkbox" /> Avoid stairs
          </label>
        </div>

        <Button variant="primary" onClick={handleStartRun} loading={isStarting}>
          🧀 START GRILLED CHEESE RUN
        </Button>
      </div>
    </Panel>
  );
}
