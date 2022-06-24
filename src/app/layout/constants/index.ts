import { InjectionToken } from '@angular/core';
import { Menu } from 'layout/types';

export enum Events {
  BottomNavigation = 'BottomNavigation',
  BOTTOM_NAV_ACTION = 'BOTTOM_NAV_ACTION',
  BOTTOM_NAV_ACTION_DONE = 'BOTTOM_NAV_ACTION_DONE',
}

export const NAVIGATION_CONFIG = new InjectionToken<Menu[]>(
  'NAVIGATION_CONFIG',
);
