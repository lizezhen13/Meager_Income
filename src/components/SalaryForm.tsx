import React from 'react';
import { SalaryInput } from '../types';
import styles from './SalaryForm.module.css';

interface SalaryFormProps {
  input: SalaryInput;
  onChange: (input: SalaryInput) => void;
  disabled?: boolean;
  isValid: boolean;
}

const SalaryForm: React.FC<SalaryFormProps> = ({ input, onChange, disabled = false, isValid }) => {
  const handleMonthlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onChange({ ...input, monthlySalary: Math.max(0, value) });
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onChange({ ...input, dailyWorkHours: Math.max(0, Math.min(24, value)) });
  };

  return (
    <div className={styles.form}>
      <h2 className={styles.formTitle}>薪资设置</h2>
      
      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>月薪（元）</label>
        <div className={styles.inputSuffix}>
          <input
            type="number"
            className={styles.inputField}
            value={input.monthlySalary || ''}
            onChange={handleMonthlyChange}
            placeholder="输入您的月薪金额"
            min="0"
            step="100"
            disabled={disabled}
          />
          <span className={styles.suffixText}>元</span>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.inputLabel}>每日工作时长（小时）</label>
        <div className={styles.inputSuffix}>
          <input
            type="number"
            className={styles.inputField}
            value={input.dailyWorkHours || ''}
            onChange={handleHoursChange}
            placeholder="每日工作时长，不超过24小时"
            min="0"
            max="24"
            step="0.5"
            disabled={disabled}
          />
          <span className={styles.suffixText}>小时</span>
        </div>
      </div>
    </div>
  );
};

export default SalaryForm;
