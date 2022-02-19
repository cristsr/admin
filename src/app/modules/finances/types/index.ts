import { PaginableParams } from 'core/types';

export interface Movement {
  id: number;
  date: Date;
  description: string;
  amount: number;
  category: string;
  subcategory: string;
}

export interface CreateMovement extends Omit<Movement, 'id'> {}

export interface UpdateMovement extends Partial<CreateMovement> {}

export interface MovementParams extends PaginableParams {
  orderBy?: string;
}
