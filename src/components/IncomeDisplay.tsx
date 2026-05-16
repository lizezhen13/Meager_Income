import React from 'react';
import { WorkStatus } from '../types';
import { formatCurrency } from '../utils/calculations';
import styles from './IncomeDisplay.module.css';

interface IncomeDisplayProps {
  amount: number;
  status: WorkStatus;
}

const STATUS_LABEL: Record<WorkStatus, string> = {
  idle: '准备开始',
  running: '实时计算中',
  paused: '已暂停',
  finished: '今日完成',
};

const IncomeDisplay: React.FC<IncomeDisplayProps> = ({ amount, status }) => {
  const statusClass = status === 'running'
    ? styles.running
    : status === 'paused'
      ? styles.paused
      : status === 'finished'
        ? styles.finished
        : '';

  return (
    <div className={`${styles.container} ${statusClass}`}>
      <div className={styles.headerRow}>
        <span className={styles.statusBadge}>{STATUS_LABEL[status]}</span>
        <span className={styles.label}>当前已赚</span>
      </div>
      <p className={styles.amount}>{formatCurrency(amount)}</p>
      <p className={styles.subLabel}>每一秒都在到账</p>
    </div>
  );
};

export default IncomeDisplay;
