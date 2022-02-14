export interface MovementOld {
  date: string;
  category: {
    icon: string;
    color: string;
    name: string;
  };
  description: string;
  quantity: number;
}

export interface FormatMovement {
  date: string;
  values: Omit<MovementOld, 'date'>[];
}

export interface Movement {
  date: string;
  total: string;
  values: [
    {
      date: string;
      category: {
        icon: string;
        color: string;
        name: string;
      };
      description: string;
      quantity: number;
    },
  ];
}
