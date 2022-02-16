import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { Type } from '@angular/core';
import { ValidatorFn } from './config.types';

export function validatorFactory<T>(target: Type<T>): ValidatorFn {
  return (config: Record<string, string>): T => {
    const validatedConfig = plainToClass(target, config);

    const errors = validateSync(validatedConfig as any, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      errors
        .map((error) => error.constraints)
        .map((constraints) => Object.values(constraints))
        .forEach(([v]) => console.error(v));

      throw new Error('Invalid environment configuration');
    }

    return validatedConfig;
  };
}

export function mapEnvironmentKeys<T>(type: Type<T>): {
  [key in keyof T]: string;
} {
  const keys = Object.keys(new type()) as (keyof T)[];

  const entries: (keyof T)[][] = keys.map((key) => [key, key]);

  return Object.fromEntries(entries);
}
