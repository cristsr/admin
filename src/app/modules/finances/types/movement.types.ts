import { Category, Subcategory } from './category.types';

export type MovementType = 'income' | 'expense';

export interface Movement {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: MovementType;
  category: Omit<Category, 'subcategories'>;
  subcategory: Subcategory;
}

export interface CreateMovement
  extends Omit<Movement, 'id' | 'category' | 'subcategory'> {
  category: number;
  subcategory: number;
}

export interface UpdateMovement extends Partial<CreateMovement> {}

export interface MovementFilter {
  period: Period;
  order: MovementOrder;
  category?: number;
  type?: {
    income: boolean;
    expense: boolean;
  };
}

export interface MovementQuery extends Omit<MovementFilter, 'type'> {
  type: string;
  date: string;
}

export interface GroupMovement {
  date: string;
  accumulated: number;
  values: Readonly<Movement[]>;
}

export type Period = 'day' | 'week' | 'month' | 'year';

export type MovementFormAction = 'read' | 'create' | 'update';

export type MovementOrder = 'date' | 'amount';

export interface MovementFormData {
  action: MovementFormAction;
  movement?: Movement;
}
