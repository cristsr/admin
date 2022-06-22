import { Category } from 'modules/finances/types/category.types';
import { MovementType } from 'modules/finances/types/movement.types';

export type ScheduledActions = 'create' | 'update';

export type RecurrentScheduled = 'never' | 'day' | 'week' | 'month' | 'year';

export interface Scheduled {
  id: number;
  category: Category;
  name: string;
  amount: number;
  type: MovementType;
  recurrent: RecurrentScheduled;
  date: string;
}

export interface CreateScheduled extends Omit<Scheduled, 'id' | 'category'> {
  category: number;
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
