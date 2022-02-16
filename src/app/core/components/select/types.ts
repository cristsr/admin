export interface Option {
  id: string;
  name: string;
  color: string;
  icon: string;
  suboptions?: Suboption[];
}

export interface Suboption {
  id: string;
  name: string;
}

export interface DialogConfig {
  options: Option[];
  value: DialogResult;
  enableSearch: boolean;
  type: Type;
}

export interface DialogResult extends Omit<Option, 'suboptions'> {
  suboption?: Suboption;
}

export type Type = 'default' | 'nested';
