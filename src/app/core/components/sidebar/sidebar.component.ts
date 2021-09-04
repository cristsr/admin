import { Component, EventEmitter, Output } from '@angular/core';
import { PageService } from '../../services/page/page.service';


@Component({
  selector: 'app-sidebar',
  host: {
    class: 'top-0 bottom-0 min-w-[280px] px-8 bg-white z-20 fixed sm:sticky flex flex-col shadow-sm'
  },
  template: `
    <!-- header -->
    <div class="flex flex-col pt-14 items-center">
      <div class="h-24 w-24">
        <img
          class="object-cover border-none rounded-full w-full h-full"
          src="assets/img/profile.jpeg"
          alt="">
      </div>
      <div class="flex items-center flex-col pt-4">
        <div class="leading-normal font-medium">
          Cristian Puenguenan
        </div>
        <div class="leading-normal text-xs font-medium">
          styven21121@gmail.com
        </div>
      </div>
    </div>

    <!-- Menu -->
    <ul class="pt-6">
      <li *ngFor="let menuItem of menu$ | async; index as i">
        <a
          class="flex items-center py-3 my-2 text-gray-800"
          (click)="linkClick.emit(menuItem)"
          [routerLink]="menuItem.url"
          routerLinkActive="active">
          <span class="pl-3 pr-4 material-icons-outlined">{{ menuItem.icon }}</span>
          <span class="text-base font-medium">{{ menuItem.title }}</span>
        </a>
      </li>
    </ul>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Output() linkClick = new EventEmitter();

  menu$ = this.pageService.menu$;

  constructor(private pageService: PageService) {
  }

  setSubmenuFromUrl(submenu: any): void {
    this.pageService.setSubmenu(submenu);
  }
}
