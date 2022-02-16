export const AppConfig = {
  theme: 'light',
  expandSidebar: false,
  pageTitle: '',
  menu: [
    {
      icon: 'account_balance',
      title: 'Finanzas',
      url: 'finances',
      default: true,
      submenu: [
        {
          icon: 'pie_chart_outline',
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
          icon: 'add',
          title: 'Presupuestos',
          url: 'finances/add-movement',
          type: 'link',
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
  ],
  submenu: [],
};
