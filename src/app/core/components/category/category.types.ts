import { Observable } from 'rxjs';

export interface Category {
  id: number;
  name: string;
  color: string;
  icon: string;
}

export interface Subcategory {
  id: string;
  category: string;
  name: string;
}

export type SubcategoriesQuery = (
  category: string,
) => Observable<Subcategory[]>;
