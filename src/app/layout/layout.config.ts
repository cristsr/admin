import { Menu } from 'layout/types';

export const LayoutMenu: Menu[] = [
  {
    icon: 'account_balance',
    title: 'Finanzas',
    url: 'finances',
    default: true,
    submenu: [
      {
        default: true,
        icon: 'pie_chart_outline',
        title: 'Resumen',
        tag: 'summary',
        url: 'finances/summary',
      },
      {
        icon: 'timeline',
        title: 'Movimientos',
        tag: 'movements',
        url: 'finances/movements',
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
        url: 'finances/budgets',
      },
      {
        icon: 'schedule',
        title: 'Programados',
        url: 'finances/scheduled',
      },
    ],
  },
  {
    icon: 'school',
    title: 'Educación',
    url: 'education',
    submenu: [
      {
        icon: 'description',
        title: 'Resumen',
        url: 'finances/summary',
        type: 'link',
      },
      {
        icon: 'timeline',
        title: 'Movimientos',
        url: 'finances/movements',
        type: 'link',
      },
      {
        icon: 'attach_money',
        title: 'Presupuestos',
        url: 'finances/budgets',
        type: 'link',
      },
      {
        icon: 'attach_money',
        title: 'Presupuetos',
        url: 'finances/budgets',
        type: 'link',
      },
    ],
  },
  {
    icon: 'description',
    title: 'Resumen',
    url: 'education2',
  },
  {
    icon: 'health_and_safety',
    title: 'Salud',
    url: 'health',
  },
  {
    icon: 'settings',
    title: 'Ajustes',
    url: 'settings',
  },
];
