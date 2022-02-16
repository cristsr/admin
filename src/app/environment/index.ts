import { IsString } from 'class-validator';
import { mapEnvironmentKeys, validatorFactory } from 'core/services/config';

export class Environment {
  @IsString()
  FINANCES_API: string = undefined;
}

export const ENV = mapEnvironmentKeys(Environment);
export const validator = validatorFactory(Environment);
