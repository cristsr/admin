import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
    <app-nav></app-nav>
    <div class="grid">
      <app-sidebar></app-sidebar>
      <section class="container">
        <ng-content></ng-content>
      </section>
    </div>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent { }
