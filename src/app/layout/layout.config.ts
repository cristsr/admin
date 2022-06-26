import { Menu } from 'layout/types';

export const NavigationConfig: Menu[] = [
  {
    icon: 'account_balance',
    title: 'Finanzas',
    url: '/finances',
    submenu: [
      {
        icon: 'pie_chart_outline',
        title: 'Resumen',
        tag: 'summary',
        url: '/finances/summary',
      },
      {
        icon: 'timeline',
        title: 'Movimientos',
        tag: 'movements',
        url: '/finances/movements',
      },
      {
        icon: 'add',
        tag: 'add-movement',
        type: 'action',
      },
      {
        icon: 'attach_money',
        title: 'Presupuestos',
        tag: 'budget',
        url: '/finances/budgets',
      },
      {
        icon: 'schedule',
        title: 'Programados',
        url: '/finances/scheduled',
      },
    ],
  },
  {
    icon: 'school',
    title: 'Educación',
    url: '/education',
  },
  {
    icon: 'health_and_safety',
    title: 'Salud',
    url: '/health',
  },
  {
    icon: 'settings',
    title: 'Ajustes',
    url: '/settings',
  },
];
