import { Category } from './category.types';
import { Movement } from './movement.types';

export type BudgetActions = 'create' | 'update';

export interface CreateBudget {
  name: string;
  amount: number;
  category: number;
  repeat: boolean;
}

export interface UpdateBudget extends Partial<CreateBudget> {}

export interface Budget {
  id: number;
  name: string;
  amount: number;
  spent: number;
  startDate: string;
  endDate: string;
  repeat: boolean;
  active: boolean;
  percentage: number;
  category: Category;
}

export interface BudgetDetail {
  budget: Budget;
  movements: Movement[];
}

export interface BudgetFormData {
  action: BudgetActions;
  budget?: Budget;
}

export interface BudgetAverage {
  percentage: number;
  spent: number;
  total: number;
}

export interface BudgetPage {
  budgets: Budget[];
  average: BudgetAverage;
}
