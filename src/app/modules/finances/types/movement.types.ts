import { Category, Subcategory } from './category.types';
import { MatFormFieldAppearance } from '@angular/material/form-field';

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
  type?: string;
}

export interface MovementQuery extends MovementFilter {
  date: string;
}

export interface GroupMovement {
  date: string;
  accumulated: number;
  values: Readonly<Movement[]>;
}

export type Period = 'day' | 'week' | 'month' | 'year';

export type MovementFormAction = 'read' | 'create' | 'edit';

export type MovementOrder = 'date' | 'amount';

export interface MovementFormData {
  action: MovementFormAction;
  movement?: Movement;
  appearance?: MatFormFieldAppearance;
}
