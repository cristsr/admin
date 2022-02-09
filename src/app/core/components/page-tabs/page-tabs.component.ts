import { Component } from '@angular/core';
import { PageService } from 'core/services/page/page.service';

@Component({
  selector: 'app-page-tabs',
  host: {
    class: 'row'
  },
  template: `
    <ng-container *ngIf="(submenu$ | async) as submenu">
      <a class="tab-link"
         *ngFor="let item of submenu"
         [routerLink]="item.url"
         routerLinkActive="active"
         href="#" (click)="$event.preventDefault()">
        <app-icon [icon]="item.icon"></app-icon>
        <span class="tab-title">{{item.title}}</span>
      </a>
    </ng-container>
  `,
  styleUrls: ['./page-tabs.component.scss'],
})
export class PageTabsComponent {
  submenu$ = this.layoutService.submenu$;

  constructor(private layoutService: PageService) { }
}
