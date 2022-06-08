import { Movement } from 'modules/finances/types/movement.types';
import { Category } from 'modules/finances/types/category.types';

export type ExpensePeriod = 'day' | 'week' | 'month';

export interface Balance {
  balance: number;
  incomeMonth: number;
  expenseMonth: number;
  incomeYear: number;
  expenseYear: number;
}

export interface CategoryExpense {
  amount: number;
  percentage: number;
  category: Omit<Category, 'subcategories'>;
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
