import { Movement } from 'modules/finances/types/movement.types';

export type ExpensePeriod = 'daily' | 'weekly' | 'monthly';

export interface Balance {
  balance: number;
  incomeMonth: number;
  expenseMonth: number;
  incomeYear: number;
  expenseYear: number;
}

export interface CategoryExpense {
  amount: number;
  name: string;
  color: string;
  icon: string;
  percentage: number;
}

export type ExpensesRaw = {
  [key in ExpensePeriod]: CategoryExpense[];
};

export interface Expense {
  categoryExpenses: CategoryExpense[];
  chart: {
    series: number[];
    labels: string[];
    colors: string[];
  };
}

export type Expenses = {
  [key in ExpensePeriod]: Expense;
};

export interface Summary {
  balance: Balance;
  expenses: Expenses;
  movements: Movement[];
}
