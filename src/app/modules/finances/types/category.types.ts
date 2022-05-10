export interface Category {
  id: number;
  name: string;
  icon: string;
  color: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: number;
  name: string;
}
