import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationService } from '../core/services/navigation/navigation.service';

@Component({
  selector: 'app-layout',
  host: {
    class: 'relative flex h-screen w-screen'
  },
  template: `
    <!-- Sidebar -->
    <app-sidebar></app-sidebar>

    <div class="flex flex-col h-screen w-full">
      <!-- Navbar -->
      <app-nav></app-nav>

      <!-- Content -->
      <div class="flex flex-col h-screen overflow-y-auto bg-gray-50">
        <ng-content></ng-content>
      </div>

      <!-- BottomNav -->
      <app-bottom-nav></app-bottom-nav>
    </div>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  get isMobile(): boolean {
    return this.navigation.isMobile;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private navigation: NavigationService
  ) { }

  ngOnInit(): void {
    this.navigation.listenWindowResize();
  }
}
