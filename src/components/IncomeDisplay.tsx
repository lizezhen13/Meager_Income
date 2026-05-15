import React from 'react';
import { formatCurrency } from '../utils/calculations';
import styles from './IncomeDisplay.module.css';

interface IncomeDisplayProps {
  amount: number;
  status: string;
}

const IncomeDisplay: React.FC<IncomeDisplayProps> = ({ amount }) => {
  return (
    <div className={styles.container}>
      <p className={styles.label}>当前已赚</p>
      <p className={styles.amount}>{formatCurrency(amount)}</p>
      <p className={styles.subLabel}>实时计算中...</p>
    </div>
  );
};

export default IncomeDisplay;
