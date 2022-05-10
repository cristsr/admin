import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-layout',
  template: `
    <!-- Wrapper -->
    <div class="flex flex-col flex-auto w-full">
      <!-- Content -->
      <div class="flex flex-col flex-auto">
        <router-outlet *ngIf="true"></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./empty.component.scss'],
})
export class EmptyLayoutComponent {
  constructor() {}
}
