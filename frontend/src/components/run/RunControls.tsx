import { useState } from 'react';
import { Button } from '../common/Button';
import { useRunStore } from '../../store/runStore';
import { useFeedStore } from '../../store/feedStore';

export function RunControls() {
  const [isStarting, setIsStarting] = useState(false);
  const { startRun, currentRun } = useRunStore();
  const { addFeedItem } = useFeedStore();

  const handleStartRun = async () => {
    setIsStarting(true);
    
    addFeedItem({
      id: Date.now().toString(),
      timestamp: new Date(),
      type: 'run_start',
      user: 'you',
      message: 'started a run to Grilled Cheese Shop'
    });

    setTimeout(() => {
      setIsStarting(false);
    }, 1500);
  };

  return (
    <div className="run-controls">
      <Button 
        variant="primary"
        className="btn-large"
        onClick={handleStartRun}
        loading={isStarting}
      >
        🧀 {currentRun ? 'RUN IN PROGRESS...' : 'START GRILLED CHEESE RUN'}
      </Button>
      
      <div className="run-controls-grid">
        <Button>Find Optimal Route</Button>
        <Button>Invite Friends</Button>
        <Button>Check Wait Times</Button>
        <Button>View Menu</Button>
      </div>
    </div>
  );
}