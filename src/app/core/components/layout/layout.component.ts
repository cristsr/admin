import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <app-nav></app-nav>
    <app-sidebar></app-sidebar>
    <app-layout-header></app-layout-header>
    <div class="main-layout">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent { }
