import { Injectable } from '@angular/core';
import { Action } from '../../interfaces/Action';
import { Menu } from '../../interfaces/Menu';
import { menu } from '../../../app.config';
import { Store } from '../../clasess/store.class';


export interface LayoutState {
  theme: 'light' | 'dark';
  expandSidebar: boolean;
  pageTitle: string;
  menu: Menu[];
  submenu: Menu[];
}

export type LayoutAction = Action<LayoutState>;

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  store = new Store<LayoutAction, LayoutState>(
    {
      theme: 'light',
      expandSidebar: true,
      pageTitle: '',
      menu,
      submenu: []
    },
    LayoutService.reducer
  );

  state$ = this.store.state$;

  private static reducer(state: LayoutState, action: LayoutAction): LayoutState {
    switch (action.type) {
      case 'SET_THEME': {
        return {
          ...state,
          theme: action.payload
        } as LayoutState;
      }
      case 'TOGGLE_THEME': {
        return {
          ...state,
          theme: state.theme === 'light' ? 'dark' : 'light'
        } as LayoutState;
      }
      case 'TOGGLE_SIDEBAR': {
        return {
          ...state,
          expandSidebar: !state.expandSidebar
        };
      }
      case 'SET_TITLE': {
        return {
          ...state,
          pageTitle: state.menu.find(v => v.url === action.payload)?.title || 'not found'
        } as LayoutState;
      }
      case 'SET_SUBMENU': {
        return {
          ...state,
          submenu: state.menu.find(v => v.url === action.payload)?.submenu || []
        } as LayoutState;
      }
      default: {
        return state;
      }
    }
  }

  setTheme(theme: string): void {
    this.store.next({
      type: 'SET_THEME',
      payload: theme
    });
  }

  toggleTheme(): void {
    this.store.next({
      type: 'TOGGLE_THEME'
    });
  }

  toggleSidebar(): void {
    this.store.next({
      type: 'TOGGLE_SIDEBAR'
    });
  }

  setPageTitle(url: string): void {
    this.store.next({
      type: 'SET_TITLE',
      payload: url
    });
  }

  setSubmenu(url): void {
    this.store.next({
      type: 'SET_SUBMENU',
      payload: url
    });
  }
}
