import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout/layout.service';
import { map } from 'rxjs/operators';
import { PageService } from '../../services/page/page.service';

@Component({
  selector: 'app-page-title',
  template: `
    <app-container>
      <h2>{{ pageTitle$| async }}</h2>
    </app-container>
  `,
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent {
  pageTitle$ = this.pageService.pageTitle$;

  constructor(private pageService: PageService) { }
}
