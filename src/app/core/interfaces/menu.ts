export interface Menu {
  title: string;
  icon: string;
  url?: string;
  submenu?: Array<Omit<Menu, 'submenu'>>;
}
