import { useState, useCallback, useRef, useEffect } from 'react';
import { WorkStatus, SalaryInput, IncomeStats } from '../types';
import { 
  calculateIncomeStats, 
  loadSalaryInput, 
  saveSalaryInput,
  getDefaultAchievements,
  getAchievementThreshold
} from '../utils/calculations';

const UPDATE_INTERVAL = 100;

export function useWorkTimer() {
  const [status, setStatus] = useState<WorkStatus>('idle');
  const [salaryInput, setSalaryInput] = useState<SalaryInput>({
    monthlySalary: 0,
    dailyWorkHours: 8,
  });
  const [incomeStats, setIncomeStats] = useState<IncomeStats | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [earnedAmount, setEarnedAmount] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  
  const startTimeRef = useRef<number | null>(null);
  const pausedElapsedRef = useRef(0);
  const unlockedAchievementsRef = useRef<Set<string>>(new Set());

  // 初始化：从 localStorage 加载保存的输入
  useEffect(() => {
    const saved = loadSalaryInput();
    if (saved) {
      setSalaryInput(saved);
      const stats = calculateIncomeStats(saved);
      setIncomeStats(stats);
    }
  }, []);

  useEffect(() => {
    unlockedAchievementsRef.current = unlockedAchievements;
  }, [unlockedAchievements]);

  const checkAchievementUnlock = useCallback((amount: number, dailyIncome: number) => {
    const achievements = getDefaultAchievements();
    const newlyUnlocked: string[] = [];
    const currentUnlocked = unlockedAchievementsRef.current;

    achievements.forEach(achievement => {
      if (!currentUnlocked.has(achievement.id)) {
        const threshold = getAchievementThreshold(achievement, dailyIncome);
        if (amount >= threshold) {
          newlyUnlocked.push(achievement.id);
        }
      }
    });

    if (newlyUnlocked.length > 0) {
      setUnlockedAchievements(prev => {
        const updated = new Set(prev);
        let hasChange = false;
        newlyUnlocked.forEach(id => {
          if (!updated.has(id)) {
            updated.add(id);
            hasChange = true;
          }
        });
        if (!hasChange) return prev;
        unlockedAchievementsRef.current = updated;
        return updated;
      });
    }
  }, []);

  const updateState = useCallback(() => {
    if (!startTimeRef.current || !incomeStats) return;

    const now = Date.now();
    const currentElapsed = pausedElapsedRef.current + (now - startTimeRef.current) / 1000;
    const totalWorkSeconds = salaryInput.dailyWorkHours * 3600;
    
    // 检查是否达到工作时长上限
    if (currentElapsed >= totalWorkSeconds) {
      startTimeRef.current = null;
      pausedElapsedRef.current = totalWorkSeconds;
      setElapsedSeconds(totalWorkSeconds);
      setEarnedAmount(incomeStats.dailyIncome);
      setStatus('finished');
      
      // 解锁所有成就
      const allAchievements = getDefaultAchievements();
      const newUnlocked = new Set<string>();
      allAchievements.forEach(a => newUnlocked.add(a.id));
      unlockedAchievementsRef.current = newUnlocked;
      setUnlockedAchievements(newUnlocked);
      return;
    }

    const earned = currentElapsed * incomeStats.secondIncome;
    setElapsedSeconds(currentElapsed);
    setEarnedAmount(earned);

    // 检查成就解锁
    checkAchievementUnlock(earned, incomeStats.dailyIncome);
  }, [checkAchievementUnlock, incomeStats, salaryInput.dailyWorkHours]);

  useEffect(() => {
    if (status !== 'running') return;

    updateState();
    const intervalId = setInterval(updateState, UPDATE_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [status, updateState]);

  const startWork = useCallback(() => {
    if (!incomeStats) return;
    
    startTimeRef.current = Date.now();
    setStatus('running');
  }, [incomeStats]);

  const pauseWork = useCallback(() => {
    if (startTimeRef.current) {
      pausedElapsedRef.current += (Date.now() - startTimeRef.current) / 1000;
      startTimeRef.current = null;
    }
    
    setStatus('paused');
  }, []);

  const resumeWork = useCallback(() => {
    startTimeRef.current = Date.now();
    setStatus('running');
  }, []);

  const resetToday = useCallback(() => {
    startTimeRef.current = null;
    pausedElapsedRef.current = 0;
    setElapsedSeconds(0);
    setEarnedAmount(0);
    const emptyAchievements = new Set<string>();
    unlockedAchievementsRef.current = emptyAchievements;
    setUnlockedAchievements(emptyAchievements);
    setStatus('idle');
  }, []);

  const updateSalaryInput = useCallback((input: SalaryInput) => {
    setSalaryInput(input);
    saveSalaryInput(input);
    
    // 只有在 idle 状态下才更新收入统计
    if (status === 'idle') {
      const stats = calculateIncomeStats(input);
      setIncomeStats(stats);
    }
  }, [status]);

  const handleAction = useCallback(() => {
    switch (status) {
      case 'idle':
        startWork();
        break;
      case 'running':
        pauseWork();
        break;
      case 'paused':
        resumeWork();
        break;
      case 'finished':
        // finished 状态不响应操作
        break;
    }
  }, [status, startWork, pauseWork, resumeWork]);

  return {
    status,
    salaryInput,
    incomeStats,
    elapsedSeconds,
    earnedAmount,
    unlockedAchievements,
    updateSalaryInput,
    handleAction,
    resetToday,
  };
}
