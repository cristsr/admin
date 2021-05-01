import { Menu } from './core/interfaces/Menu';

export const menu: Menu[] = [
  {
    icon: 'school',
    title: 'Educación',
    url: 'education',
  },
  {
    icon:  'account_balance',
    title: 'Finanzas',
    url: 'finances',
    submenu: [
      {
        icon: 'description',
        title: 'Resumen',
        url: 'finances/summary'
      },
      {
        icon: 'timeline',
        title: 'Movimientos',
        url: 'finances/movements'
      },
      {
        icon: 'attach_money',
        title: 'Presupuestos',
        url: 'finances/budgets',
      },
    ]
  },
  {
    icon:  'health_and_safety',
    title: 'Salud',
    url: 'health',
  }
];
