import { Component } from '@angular/core';
import { PageService } from '../../services/page/page.service';

@Component({
  selector: 'app-layout',
  template: `
    <app-nav></app-nav>
    <app-sidebar></app-sidebar>
    <div class="content">
      <div class="sub-header">
        <div class="container">
          <app-page-tabs></app-page-tabs>
        </div>
      </div>
      <div class="main-layout">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  pageTitle$ = this.pageService.pageTitle$;

  constructor(private pageService: PageService) {
  }
}
