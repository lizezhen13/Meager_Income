import React from 'react';
import { WorkStatus } from '../types';
import { CheckIcon, PauseIcon, PlayIcon, ResetIcon } from './Icons';
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

const BUTTON_ICON: Record<WorkStatus, React.FC<{ className?: string }>> = {
  idle: PlayIcon,
  running: PauseIcon,
  paused: PlayIcon,
  finished: CheckIcon,
};

const ActionButtons: React.FC<ActionButtonsProps> = ({ status, onAction, onReset, canStart }) => {
  const isFinished = status === 'finished';
  const isRunning = status === 'running';
  const showReset = status === 'paused' || status === 'finished';
  const PrimaryIcon = BUTTON_ICON[status];

  return (
    <div className={styles.container}>
      <button
        className={`${styles.primaryBtn} ${isFinished ? styles.finished : ''} ${isRunning ? styles.running : ''}`}
        onClick={onAction}
        disabled={!canStart && status === 'idle'}
      >
        <PrimaryIcon className={styles.buttonIcon} />
        <span className={styles.buttonLabel}>{BUTTON_TEXT[status]}</span>
      </button>
      
      {showReset && (
        <button className={styles.secondaryBtn} onClick={onReset}>
          <ResetIcon className={styles.secondaryIcon} />
          <span className={styles.buttonLabel}>重置今日进度</span>
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
