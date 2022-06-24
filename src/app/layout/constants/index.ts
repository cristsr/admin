import { InjectionToken } from '@angular/core';
import { Menu } from 'layout/types';

export enum Events {
  BOTTOM_NAV_ACTION = 'BOTTOM_NAV_ACTION',
}

export const NAVIGATION_CONFIG = new InjectionToken<Menu[]>(
  'NAVIGATION_CONFIG',
);
