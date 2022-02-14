export interface Option {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export interface Suboption {
  id: string;
  name: string;
  option: string;
}

export interface DialogConfig {
  list: List;
  sublist?: Sublist;
  value: Option;
  enableSearch: boolean;
  type: Type;
}

export type List = Option[];
export type Sublist = Suboption[];
export type Type = 'default' | 'nested';
