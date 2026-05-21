import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useWorkTimer } from './hooks/useWorkTimer';
import SalaryForm from './components/SalaryForm';
import IncomeDisplay from './components/IncomeDisplay';
import WorkTimer from './components/WorkTimer';
import ProgressBar from './components/ProgressBar';
import ActionButtons from './components/ActionButtons';
import IncomeRateCard from './components/IncomeRateCard';
import AchievementList from './components/AchievementList';
import { ArrowBackIcon, PowerArmIcon } from './components/Icons';
import Onboarding from './Onboarding';
import styles from './App.module.css';

type ViewState = 'setup' | 'working';
type AppRoute = 'onboarding' | 'app';

const APP_PATH = '/app';

const getInitialRoute = (): AppRoute => {
  if (typeof window === 'undefined') {
    return 'onboarding';
  }

  const normalizedPath = window.location.pathname.replace(/\/+$/, '');
  return normalizedPath === APP_PATH ? 'app' : 'onboarding';
};

const ApplicationPage: React.FC = () => {
  const [view, setView] = useState<ViewState>('setup');

  const {
    status,
    salaryInput,
    incomeStats,
    elapsedSeconds,
    earnedAmount,
    unlockedAchievements,
    updateSalaryInput,
    handleAction,
    resetToday,
  } = useWorkTimer();

  const isValid = useMemo(() => {
    return salaryInput.monthlySalary > 0 && 
           salaryInput.dailyWorkHours > 0 && 
           salaryInput.dailyWorkHours <= 24;
  }, [salaryInput]);

  // 点击"开始打工" → 切换到工作页并启动
  const handleStart = useCallback(() => {
    if (!isValid) return;
    setView('working');
    // 延迟一帧确保视图切换后再开始计时，避免首次渲染卡顿
    requestAnimationFrame(() => {
      handleAction();
    });
  }, [handleAction, isValid]);

  // 重置 → 回到设置页
  const handleReset = useCallback(() => {
    resetToday();
    setView('setup');
  }, [resetToday]);

  // 返回设置页（不重置进度）
  const handleBack = useCallback(() => {
    setView('setup');
  }, []);

  // ====== 设置页 ======
  if (view === 'setup') {
    return (
      <div className={styles.app}>
        <div className={styles.setupView}>
          <header className={styles.setupHeader}>
            <h1 className={styles.headerTitle}>Meager Income</h1>
            <p className={styles.headerSubtitle}>碎银几两苦中求，忙忙碌碌几时休</p>
          </header>

          <div className={styles.setupForm}>
            <SalaryForm
              input={salaryInput}
              onChange={updateSalaryInput}
              disabled={false}
            />
          </div>

          <button
            className={styles.startBtn}
            onClick={handleStart}
            disabled={!isValid}
          >
            <PowerArmIcon className={styles.startIcon} />
            <span className={styles.startText}>开始打工</span>
          </button>
        </div>

        <footer className={styles.footer}>
          <p>Meager Income © {new Date().getFullYear()}</p>
        </footer>
      </div>
    );
  }

  // ====== 工作页 ======
  return (
    <div className={`${styles.app} ${styles.workView}`}>
      <header className={styles.workHeader}>
        <h1 className={styles.workHeaderTitle}>
          <span className={styles.brandMark} aria-hidden="true">💰</span>
          Meager Income
        </h1>
        <button className={styles.backBtn} onClick={handleBack}>
          <ArrowBackIcon className={styles.backIcon} />
          返回设置
        </button>
      </header>

      {incomeStats && (
        <>
          {/* 双列布局：工作面板卡片 + 收入速率卡片 */}
          <div className={styles.cardsRow}>
            {/* 左侧：工作面板（当前已赚 + 计时 + 进度 + 按钮） */}
            <div className={styles.workPanelCard}>
              <div className={`${styles.section} ${styles.incomeSection}`}>
                <IncomeDisplay amount={earnedAmount} status={status} />
              </div>

              {(status === 'running' || status === 'paused' || status === 'finished') && (
                <>
                  <div className={`${styles.section} ${styles.timerSection}`}>
                    <WorkTimer
                      elapsedSeconds={elapsedSeconds}
                      dailyWorkHours={salaryInput.dailyWorkHours}
                    />
                  </div>

                  <div className={`${styles.section} ${styles.progressSection}`}>
                    <ProgressBar
                      elapsedSeconds={elapsedSeconds}
                      dailyWorkHours={salaryInput.dailyWorkHours}
                    />
                  </div>
                </>
              )}

              <div className={`${styles.section} ${styles.actionsSection}`}>
                <ActionButtons
                  status={status}
                  onAction={handleAction}
                  onReset={handleReset}
                  canStart={isValid}
                />
              </div>
            </div>

            {/* 右侧：收入速率卡片 */}
            <IncomeRateCard stats={incomeStats} />
          </div>

          {/* 下方：成就列表 */}
          <section className={`${styles.section} ${styles.achievementsSection}`}>
            <AchievementList
              incomeStats={incomeStats}
              unlockedIds={unlockedAchievements}
              earnedAmount={earnedAmount}
            />
          </section>
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [route, setRoute] = useState<AppRoute>(getInitialRoute);

  useEffect(() => {
    const syncRoute = () => {
      setRoute(getInitialRoute());
    };

    window.addEventListener('popstate', syncRoute);

    return () => {
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  useEffect(() => {
    document.title = route === 'onboarding'
      ? 'Meager Income Onboarding - Pixel Work'
      : 'Meager Income - 实时工资可视化';
  }, [route]);

  const handleEnterApp = useCallback(() => {
    if (getInitialRoute() !== 'app') {
      window.history.pushState({ route: 'app' }, '', APP_PATH);
    }

    setRoute('app');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  if (route === 'onboarding') {
    return <Onboarding onEnterApp={handleEnterApp} />;
  }

  return <ApplicationPage />;
};

export default App;
