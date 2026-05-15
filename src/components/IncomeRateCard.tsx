import React from 'react';
import { IncomeStats } from '../types';
import { formatCurrency } from '../utils/calculations';
import styles from './IncomeRateCard.module.css';

interface IncomeRateCardProps {
  stats: IncomeStats | null;
}

const IncomeRateCard: React.FC<IncomeRateCardProps> = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>收入速率</h3>
      <div className={styles.cardBody}>
        {/* 日薪置顶 - 全宽高亮 */}
        <div className={`${styles.rateItem} ${styles.dailyHighlight}`}>
          <p className={styles.rateLabel}>今日日薪</p>
          <p className={styles.rateValue}>{formatCurrency(stats.dailyIncome)}</p>
        </div>

        {/* 其余两两一行 */}
        <div className={styles.rateGrid}>
          <div className={styles.rateItem}>
            <p className={styles.rateLabel}>本月天数</p>
            <p className={styles.rateValue}>{stats.daysInCurrentMonth}天</p>
          </div>
          <div className={styles.rateItem}>
            <p className={styles.rateLabel}>每秒</p>
            <p className={styles.rateValue}>{formatCurrency(stats.secondIncome, 4)}</p>
          </div>
          <div className={styles.rateItem}>
            <p className={styles.rateLabel}>每分钟</p>
            <p className={styles.rateValue}>{formatCurrency(stats.minuteIncome)}</p>
          </div>
          <div className={styles.rateItem}>
            <p className={styles.rateLabel}>每小时</p>
            <p className={styles.rateValue}>{formatCurrency(stats.hourlyIncome)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeRateCard;
