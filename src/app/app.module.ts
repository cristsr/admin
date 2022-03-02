import { Injector, NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from 'layout/layout.module';
import { HammerConfig } from 'core/config';
import { WINDOW } from 'core/config';
import { ConfigModule } from 'core/services/config';
import { validator } from 'environment';

import { ThemeService } from 'core/services/theme/theme.service';
import { EventEmitter2 } from 'eventemitter2';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ConfigModule.forRoot({
      path: '/assets/config.json',
      validate: validator,
    }),
    HammerModule,
    AppRoutingModule,
    HttpClientModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    LayoutModule,
  ],
  providers: [
    ThemeService,
    {
      provide: WINDOW,
      useValue: window,
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig,
    },
    {
      provide: EventEmitter2,
      useValue: new EventEmitter2({
        wildcard: true,
      }),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  static injector: Injector;

  constructor(injector: Injector) {
    AppModule.injector = injector;
  }
}
