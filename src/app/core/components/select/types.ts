export interface Option {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface SelectConfig {
  list: Option[];
  value: Option;
  enableSearch: boolean;
}
