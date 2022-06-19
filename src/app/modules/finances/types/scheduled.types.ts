import { Category } from 'modules/finances/types/category.types';

export interface Scheduled {
  id: number;
  name: string;
  amount: number;
  date: string;
  repeat: boolean;
  category: Category;
}

export interface CreateScheduled extends Omit<Scheduled, 'id' | 'category'> {
  category: number;
}

export interface UpdateScheduled extends Partial<CreateScheduled> {}
