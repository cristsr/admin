import { Category, Subcategory } from 'modules/finances/types/category.types';
import { MovementType } from 'modules/finances/types/movement.types';

export type ScheduledActions = 'read' | 'create' | 'update';

export type RecurrentScheduled = 'never' | 'day' | 'week' | 'month' | 'year';

export interface Scheduled {
  id: number;
  type: MovementType;
  date: string;
  description: string;
  amount: number;
  recurrent: RecurrentScheduled;
  category: Category;
  subcategory: Subcategory;
}

export interface CreateScheduled
  extends Omit<Scheduled, 'id' | 'category' | 'subcategory'> {
  category: number;
  subcategory: number;
}

export interface UpdateScheduled extends Partial<CreateScheduled> {}

export interface ScheduledFormData {
  action: ScheduledActions;
  scheduled: Scheduled;
}

export interface ScheduledAverage {}

export interface ScheduledPage {
  average: ScheduledAverage;
  scheduled: Scheduled[];
}
