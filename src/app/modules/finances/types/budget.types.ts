import { Category } from './category.types';
import { GroupMovement } from './movement.types';

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
  category: Category;
}

export interface BudgetDetail {
  budget: Budget;
  movements: GroupMovement[];
}
