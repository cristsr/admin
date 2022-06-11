import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { validator } from 'environment';
import { HammerConfig, splashFactory, WINDOW } from 'core/config';
import { ConfigModule, ThemeService } from 'core/services';
import { HttpInterceptor } from 'core/interceptors';
import { LayoutModule } from 'layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ConfigModule.forRoot({
      path: '/assets/config.json',
      validate: validator,
    }),
    HammerModule,
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
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: splashFactory,
      deps: [DOCUMENT, Router],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
