import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <ng-container class="template">
      <app-nav></app-nav>
      <app-sidebar></app-sidebar>
      <div class="content">
        <app-page-title></app-page-title>
        <app-page-tabs></app-page-tabs>
        <div class="main-layout">
          <ng-content></ng-content>
        </div>
      </div>
    </ng-container>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent { }
