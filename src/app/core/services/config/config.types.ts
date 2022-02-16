export interface ConfigOptions {
  path: string;
  validate?: ValidatorFn;
}

export type ValidatorFn = (config: Record<string, any>) => Record<string, any>;
