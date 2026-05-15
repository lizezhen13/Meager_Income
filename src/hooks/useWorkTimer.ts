import { useState, useCallback, useRef, useEffect } from 'react';
import { WorkStatus, SalaryInput, IncomeStats } from '../types';
import { 
  calculateIncomeStats, 
  loadSalaryInput, 
  saveSalaryInput,
  getDefaultAchievements,
  getAchievementThreshold
} from '../utils/calculations';

const UPDATE_INTERVAL = 100; // 更新间隔 100ms

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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 初始化：从 localStorage 加载保存的输入
  useEffect(() => {
    const saved = loadSalaryInput();
    if (saved) {
      setSalaryInput(saved);
      const stats = calculateIncomeStats(saved);
      setIncomeStats(stats);
    }
  }, []);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const updateState = useCallback(() => {
    if (!startTimeRef.current || !incomeStats) return;

    const now = Date.now();
    const currentElapsed = pausedElapsedRef.current + (now - startTimeRef.current) / 1000;
    const totalWorkSeconds = salaryInput.dailyWorkHours * 3600;
    
    // 检查是否达到工作时长上限
    if (currentElapsed >= totalWorkSeconds) {
      setElapsedSeconds(totalWorkSeconds);
      setEarnedAmount(incomeStats.dailyIncome);
      setStatus('finished');
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // 解锁所有成就
      const allAchievements = getDefaultAchievements();
      const newUnlocked = new Set<string>();
      allAchievements.forEach(a => newUnlocked.add(a.id));
      setUnlockedAchievements(newUnlocked);
      return;
    }

    const earned = currentElapsed * incomeStats.secondIncome;
    setElapsedSeconds(currentElapsed);
    setEarnedAmount(earned);

    // 检查成就解锁
    checkAchievementUnlock(earned, incomeStats.dailyIncome);
  }, [incomeStats, salaryInput.dailyWorkHours]);

  const checkAchievementUnlock = useCallback((amount: number, dailyIncome: number) => {
    const achievements = getDefaultAchievements();
    const newlyUnlocked: string[] = [];

    achievements.forEach(achievement => {
      if (!unlockedAchievements.has(achievement.id)) {
        const threshold = getAchievementThreshold(achievement, dailyIncome);
        if (amount >= threshold) {
          newlyUnlocked.push(achievement.id);
        }
      }
    });

    if (newlyUnlocked.length > 0) {
      setUnlockedAchievements(prev => {
        const updated = new Set(prev);
        newlyUnlocked.forEach(id => updated.add(id));
        return updated;
      });
    }
  }, [unlockedAchievements]);

  const startWork = useCallback(() => {
    if (!incomeStats) return;
    
    startTimeRef.current = Date.now();
    setStatus('running');
    
    intervalRef.current = setInterval(updateState, UPDATE_INTERVAL);
  }, [incomeStats, updateState]);

  const pauseWork = useCallback(() => {
    if (startTimeRef.current) {
      pausedElapsedRef.current += (Date.now() - startTimeRef.current) / 1000;
      startTimeRef.current = null;
    }
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    setStatus('paused');
  }, []);

  const resumeWork = useCallback(() => {
    startTimeRef.current = Date.now();
    setStatus('running');
    
    intervalRef.current = setInterval(updateState, UPDATE_INTERVAL);
  }, [updateState]);

  const resetToday = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    startTimeRef.current = null;
    pausedElapsedRef.current = 0;
    setElapsedSeconds(0);
    setEarnedAmount(0);
    setUnlockedAchievements(new Set());
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
