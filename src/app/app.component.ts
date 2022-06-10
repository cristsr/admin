import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet> <app-loader></app-loader>',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {}
