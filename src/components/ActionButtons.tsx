import React from 'react';
import { WorkStatus } from '../types';
import styles from './ActionButtons.module.css';

interface ActionButtonsProps {
  status: WorkStatus;
  onAction: () => void;
  onReset: () => void;
  canStart: boolean;
}

const BUTTON_TEXT: Record<WorkStatus, string> = {
  idle: '开始打工',
  running: '收工休息',
  paused: '继续打工',
  finished: '今日已完成',
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ status, onAction, onReset, canStart }) => {
  const isFinished = status === 'finished';
  const showReset = status === 'paused' || status === 'finished';
  
  return (
    <div className={styles.container}>
      <button
        className={`${styles.primaryBtn} ${isFinished ? styles.finished : ''}`}
        onClick={onAction}
        disabled={!canStart && status === 'idle'}
      >
        {BUTTON_TEXT[status]}
      </button>
      
      {showReset && (
        <button className={styles.secondaryBtn} onClick={onReset}>
          重置今日进度
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
