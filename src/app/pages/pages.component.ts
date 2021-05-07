import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { PageService } from '../core/services/page/page.service';

@Component({
  selector: 'app-pages',
  template: `
    <app-layout [class]="isExpandedMenu$ | async">
      <router-outlet></router-outlet>
    </app-layout>
  `,
})
export class PagesComponent {
  isExpandedMenu$ = this.pageService.isExpandedMenu$.pipe(
    map(v => v ? 'is-expanded' : 'is-collapsed')
  );
  constructor(private pageService: PageService) {
  }
}
