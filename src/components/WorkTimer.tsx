import React from 'react';
import { formatDuration, calculateProgress } from '../utils/calculations';
import styles from './WorkTimer.module.css';

interface WorkTimerProps {
  elapsedSeconds: number;
  dailyWorkHours: number;
}

const WorkTimer: React.FC<WorkTimerProps> = ({ elapsedSeconds, dailyWorkHours }) => {
  const progress = calculateProgress(elapsedSeconds, dailyWorkHours);

  return (
    <div className={styles.container}>
      <div className={styles.timerBlock}>
        <p className={styles.timerLabel}>已工作</p>
        <p className={styles.timerValue}>{formatDuration(elapsedSeconds)}</p>
      </div>
      <div className={styles.progressBlock}>
        <p className={styles.timerLabel}>今日进度</p>
        <p className={styles.progressValue}>{progress.toFixed(1)}%</p>
      </div>
    </div>
  );
};

export default React.memo(WorkTimer);
