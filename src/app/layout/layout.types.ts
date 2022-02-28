export interface Submenu extends Omit<Menu, 'submenu'> {
  type?: 'link' | 'action';
}

export interface Menu {
  title: string;
  icon: string;
  url?: string;
  tag?: string;
  submenu?: Array<Submenu>;
  default?: true;
}