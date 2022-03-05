import { PaginableQuery } from 'core/types';
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

export interface MovementQuery extends PaginableQuery {
  orderBy?: string;
  groupBy?: GroupBy;
}

export interface GroupMovement {
  group: string;
  accumulated: number;
  values: Readonly<Movement[]>;
}

export type GroupBy = 'days' | 'weeks' | 'months' | 'years';
