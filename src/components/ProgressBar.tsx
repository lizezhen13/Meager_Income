import React from 'react';
import { formatDuration, calculateProgress } from '../utils/calculations';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  elapsedSeconds: number;
  dailyWorkHours: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ elapsedSeconds, dailyWorkHours }) => {
  const progress = calculateProgress(elapsedSeconds, dailyWorkHours);
  const totalSeconds = dailyWorkHours * 3600;
  const remaining = Math.max(0, totalSeconds - elapsedSeconds);

  return (
    <div className={styles.wrapper}>
      <div className={styles.infoRow}>
        <span className={styles.progressText}>
          {formatDuration(elapsedSeconds)} / {formatDuration(totalSeconds)}
        </span>
        <span className={styles.progressText}>
          剩余 {formatDuration(remaining)}
        </span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
    </div>
  );
};

export default React.memo(ProgressBar);
