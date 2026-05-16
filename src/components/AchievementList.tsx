import React from 'react';
import { IncomeStats, AchievementType } from '../types';
import { getDefaultAchievements, getAchievementThreshold } from '../utils/calculations';
import styles from './AchievementList.module.css';

interface AchievementListProps {
  incomeStats: IncomeStats | null;
  unlockedIds: Set<string>;
  earnedAmount: number;
}

const AchievementList: React.FC<AchievementListProps> = ({ 
  incomeStats, 
  unlockedIds,
  earnedAmount = 0,
}) => {
  const achievements = getDefaultAchievements();

  const getDisplayThreshold = (threshold: number, type: AchievementType): string => {
    if (!incomeStats) return `${threshold}${type === 'ratio' ? '%' : '元'}`;
    
    if (type === 'fixed') {
      return `¥${threshold}`;
    }
    return `日薪 ${threshold}%`;
  };

  const getProgress = (achievementId: string, thresholdValue: number): number => {
    // 已解锁的显示100%
    if (unlockedIds.has(achievementId)) return 100;
    // 未解锁的根据已赚金额计算百分比
    return Math.min((earnedAmount / thresholdValue) * 100, 99.9);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <span className={styles.titleIcon} aria-hidden="true">🏆</span>
        成就列表
      </h3>
      <div className={styles.grid}>
        {achievements.map(achievement => {
          const isUnlocked = unlockedIds.has(achievement.id);
          const threshold = incomeStats 
            ? getAchievementThreshold(achievement, incomeStats.dailyIncome)
            : achievement.threshold;
          const progress = getProgress(achievement.id, threshold);

          return (
            <div
              key={achievement.id}
              className={`${styles.achievement} ${isUnlocked ? styles.unlocked : ''}`}
            >
              <span className={styles.lockIcon} aria-hidden="true">○</span>
              <span className={styles.unlockedBadge} aria-hidden="true">✓</span>
              
              {/* 成就名称 */}
              <p className={styles.achievementName}>{achievement.name}</p>
              
              {/* 门槛信息 + 进度文字 */}
              <div className={styles.thresholdRow}>
                <span className={styles.achievementThreshold}>
                  {getDisplayThreshold(achievement.threshold, achievement.type)}
                </span>
                {!isUnlocked && incomeStats && achievement.type === 'ratio' && (
                  <span className={styles.progressText}>{progress.toFixed(0)}%</span>
                )}
                {isUnlocked && (
                  <span className={styles.progressDone}>已达成</span>
                )}
              </div>

              {/* 进度条 */}
              <div className={styles.progressBar}>
                <div
                  className={`${styles.progressFill} ${isUnlocked ? styles.progressFillDone : ''}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementList;
