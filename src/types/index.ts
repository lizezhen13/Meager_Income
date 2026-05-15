export type WorkStatus = 'idle' | 'running' | 'paused' | 'finished';

export interface SalaryInput {
  monthlySalary: number;
  dailyWorkHours: number;
}

export interface IncomeStats {
  daysInCurrentMonth: number;
  dailyIncome: number;
  hourlyIncome: number;
  minuteIncome: number;
  secondIncome: number;
}

export type AchievementType = 'fixed' | 'ratio';

export interface Achievement {
  id: string;
  name: string;
  threshold: number;
  type: AchievementType;
}

export interface WorkState {
  status: WorkStatus;
  salaryInput: SalaryInput;
  incomeStats: IncomeStats | null;
  elapsedSeconds: number;
  earnedAmount: number;
  startTime: number | null;
  unlockedAchievements: Set<string>;
}
