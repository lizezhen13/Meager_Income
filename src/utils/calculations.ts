import { SalaryInput, IncomeStats, Achievement, AchievementType } from '../types';

export function getDaysInCurrentMonth(): number {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  return new Date(year, month, 0).getDate();
}

export function calculateIncomeStats(input: SalaryInput): IncomeStats {
  const daysInCurrentMonth = getDaysInCurrentMonth();
  const dailyIncome = input.monthlySalary / daysInCurrentMonth;
  const hourlyIncome = dailyIncome / input.dailyWorkHours;
  const minuteIncome = hourlyIncome / 60;
  const secondIncome = hourlyIncome / 3600;

  return {
    daysInCurrentMonth,
    dailyIncome,
    hourlyIncome,
    minuteIncome,
    secondIncome,
  };
}

const DEFAULT_ACHIEVEMENTS: Achievement[] = [
    { id: 'bus', name: '公交车票到账', threshold: 5, type: 'fixed' },
    { id: 'breakfast', name: '早餐钱到账', threshold: 10, type: 'fixed' },
    { id: 'milktea', name: '解锁一杯奶茶', threshold: 20, type: 'fixed' },
    { id: 'lunch', name: '午饭基金启动', threshold: 35, type: 'fixed' },
    { id: 'movie', name: '电影票进度达成', threshold: 50, type: 'fixed' },
    { id: 'shopping', name: '小购物自由', threshold: 100, type: 'fixed' },
    { id: 'feast', name: '大餐基金到账', threshold: 200, type: 'fixed' },
    { id: 'tech', name: '数码小件基金', threshold: 300, type: 'fixed' },
    { id: 'quarter', name: '摸到四分之一', threshold: 25, type: 'ratio' },
    { id: 'half', name: '半日打工人', threshold: 50, type: 'ratio' },
    { id: 'three-quarter', name: '快要收工了', threshold: 75, type: 'ratio' },
    { id: 'full', name: '今日工资到账', threshold: 100, type: 'ratio' },
];

export function getDefaultAchievements(): Achievement[] {
  return DEFAULT_ACHIEVEMENTS;
}

export function getAchievementThreshold(
  achievement: Achievement,
  dailyIncome: number
): number {
  if (achievement.type === 'fixed') {
    return achievement.threshold;
  }
  return (achievement.threshold / 100) * dailyIncome;
}

export function formatCurrency(amount: number, decimals: number = 2): string {
  return `¥ ${amount.toFixed(decimals)}`;
}

export function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function calculateProgress(elapsedSeconds: number, dailyWorkHours: number): number {
  const totalWorkSeconds = dailyWorkHours * 3600;
  return Math.min((elapsedSeconds / totalWorkSeconds) * 100, 100);
}

const STORAGE_KEY = 'meager_income_salary_input';

export function saveSalaryInput(input: SalaryInput): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(input));
}

export function loadSalaryInput(): SalaryInput | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as SalaryInput;
  } catch {
    return null;
  }
}
