import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <app-nav></app-nav>
    <app-sidebar></app-sidebar>
    <app-page-title></app-page-title>
    <app-page-tabs></app-page-tabs>
    <div class="main-layout">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {}
