import { LayoutState } from 'core/services/layout/layout.service';

export const layoutInitialState: LayoutState = {
  theme: 'light',
  expandSidebar: false,
  pageTitle: '',
  menu: [
    {
      icon: 'account_balance',
      title: 'Finanzas',
      url: 'finances',
      submenu: [
        {
          icon: 'analytics',
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
      icon: 'school',
      title: 'Educación',
      url: 'education',
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
        {
          icon: 'attach_money',
          title: 'Presupuetos',
          url: 'finances/budgets',
        },
      ]
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
    }
  ],
  submenu: []
};
