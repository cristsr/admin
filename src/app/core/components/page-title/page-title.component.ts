import { Component } from '@angular/core';
import { PageService } from '../../services/page/page.service';

@Component({
  selector: 'app-page-title',
  host: {
    class: 'container column'
  },
  template: `<h2>{{ pageTitle$| async }}</h2>`,
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent {
  pageTitle$ = this.pageService.pageTitle$;

  constructor(private pageService: PageService) {
  }
}
