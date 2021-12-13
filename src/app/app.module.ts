import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeService } from './core/services/theme/theme.service';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from './layout/layout.module';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import * as Hammer from 'hammerjs';
import { WINDOW } from './core/window/window';

export class HammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL },
    // panmove: { direction: Hammer.DIRECTION_ALL },
  };

  buildHammer(element: HTMLElement): HammerManager {
    return new Hammer.Manager(element, {
      // touchAction: 'auto',
      // inputClass: Hammer.TouchInput,
      recognizers: [
        [Hammer.Swipe, {
          direction: Hammer.DIRECTION_HORIZONTAL
        }],
        [Hammer.Pan, {
          direction: Hammer.DIRECTION_ALL
        }],
      ]
    });
  }
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HammerModule,
    AppRoutingModule,
    HttpClientModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    LayoutModule
  ],
  providers: [
    ThemeService,
    {
      provide: WINDOW,
      useValue: window
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
