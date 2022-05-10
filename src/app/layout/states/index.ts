import { State } from 'core/classes';
import { Submenu, Menu, NavConfig, NavMainAction } from 'layout/types';
import { LayoutMenu } from 'layout/layout.config';

// Navbar states
export const navConfig = new State<NavConfig>(
  {
    title: 'Admin',
    icon: 'menu',
    action: 'toggle',
    buttons: [],
  },
  true,
);

export const navMainAction = new State<NavMainAction>();
export const navAction = new State<string>();

// Sidebar states
export const sidebarMenu = new State<Menu[]>(LayoutMenu);
export const sidebarToggle = new State<void>();
export const sidebarMenuSelected = new State<Menu>();

// Bottom nav states
export const bottomMenu = new State<Submenu[]>();
