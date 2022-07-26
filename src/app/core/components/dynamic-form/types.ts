import { MatFormFieldAppearance } from '@angular/material/form-field';
import { ValidatorFn } from '@angular/forms';

export const ComponentRegister = {
  list: {},
};

export interface DynamicFormConfig {
  type: keyof typeof ComponentRegister;
  appearance: MatFormFieldAppearance;
  label: string;
  icon: {
    name: string;
    class: string;
  };
  async?: boolean;
  validators?: ValidatorFn[];
}
