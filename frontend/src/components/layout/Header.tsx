import { useEffect, useState } from 'react';
import { useRunStore } from '../../store/runStore';

export function Header() {
  const [currentTime, setCurrentTime] = useState('--:--:--');
  const { todaysRunCount } = useRunStore();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toTimeString().split(' ')[0]);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="cheese-icon">🧀</span>
          <span className="logo-text">GRILLED_CHEESE_TRACKER</span>
        </div>
        <div className="status-bar">
          <div className="status-item">
            <span className="status-indicator"></span>
            <span>SYSTEM: ONLINE</span>
          </div>
          <div className="status-item">
            <span>RUNS TODAY: <span id="runs-today">{todaysRunCount}</span></span>
          </div>
          <div className="status-item">
            <span>TIME: <span id="current-time">{currentTime}</span></span>
          </div>
        </div>
      </div>
    </header>
  );
}