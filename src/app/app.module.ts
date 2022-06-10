import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { validator } from 'environment';
import { HammerConfig, WINDOW } from 'core/config';
import { ConfigModule, ThemeService } from 'core/services';
import { HttpInterceptor } from 'core/interceptors';
import { LoaderModule } from 'core/components';
import { LayoutModule } from 'layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    LoaderModule,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
