import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { CONFIG_OPTIONS } from './config.constants';
import { ConfigOptions } from 'core/services/config/config.types';
import { ConfigService } from 'core/services/config/config.service';

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => () => {
        return configService.loadConfig();
      },
      deps: [ConfigService],
      multi: true,
    },
  ],
})
export class ConfigModule {
  constructor(private _configService: ConfigService) {}

  static forRoot(options: ConfigOptions): ModuleWithProviders<ConfigModule> {
    return {
      ngModule: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
      ],
    };
  }
}
