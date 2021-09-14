import { Component } from '@angular/core';
import { PageService } from '../../services/page/page.service';
import { NavigationService } from '../../services/navigation/navigation.service';


@Component({
  selector: 'app-sidebar',
  template: `
    <!-- Sidebar -->
    <div
      class="top-0 bottom-0 min-w-[280px] px-8 bg-white h-screen z-30 fixed sm:sticky flex flex-col shadow-sm"
      [class.flex]="showSidebar"
      [class.hidden]="!showSidebar">

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
            (click)="onLinkClick()"
            [routerLink]="menuItem.url"
            routerLinkActive="active">
            <span class="pl-3 pr-4 material-icons-outlined">{{ menuItem.icon }}</span>
            <span class="text-base font-medium">{{ menuItem.title }}</span>
          </a>
        </li>
      </ul>
    </div>

    <!-- overlay -->
    <div
      *ngIf="isMobile && showSidebar"
      class="absolute top-0 bottom-0 left-0 right-0 bg-[#0009] opacity-75 absolute z-20"
      (click)="toggleSidebar()">
    </div>
  `,
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menu$ = this.pageService.menu$;

  get showSidebar(): boolean {
    return this.navigation.showSidebar;
  }

  get isMobile(): boolean {
    return this.navigation.isMobile;
  }

  constructor(
    private pageService: PageService,
    private navigation: NavigationService
  ) {
  }

  setSubmenuFromUrl(submenu: any): void {
    this.pageService.setSubmenu(submenu);
  }

  toggleSidebar(): void {
    this.navigation.toggleSidebar();
  }

  onLinkClick(): void {
    // Hide sidebar if device is mobile
    if (this.navigation.isMobile) {
      this.navigation.showSidebar = false;
    }
  }
}
