import { ModuleWithProviders, NgModule } from '@angular/core';
import { APP_CONFIG } from './config.constants';
import { ConfigService } from 'core/services/config/config.service';

@NgModule()
export class ConfigModule {
  constructor(private _config: ConfigService) {}

  static forRoot(config: any): ModuleWithProviders<ConfigModule> {
    return {
      ngModule: ConfigModule,
      providers: [
        {
          provide: APP_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
