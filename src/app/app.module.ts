import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ThemeService } from './core/services/theme/theme.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    ThemeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
