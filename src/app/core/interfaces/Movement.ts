export interface Movement {
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
  values: Omit<Movement, 'date'>[];
}
