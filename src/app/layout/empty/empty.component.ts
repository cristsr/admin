import { Component, OnInit } from '@angular/core';

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
  styleUrls: ['./empty.component.scss']
})
export class EmptyLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
