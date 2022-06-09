export interface Menu {
  default?: boolean;
  title?: string;
  icon: string;
  url?: string;
  submenu?: Submenu[];
}

export interface Submenu extends Omit<Menu, 'submenu' | 'nav'> {
  type?: 'link' | 'action';
  tag?: string;
}

export interface NavConfig {
  icon?: string;
  action?: NavMainAction;
  title?: string;
  buttons?: NavButton[];
}

export interface NavButton {
  icon: string;
  tag: string;
}

export type NavMainAction = 'toggle' | 'close' | 'back';
