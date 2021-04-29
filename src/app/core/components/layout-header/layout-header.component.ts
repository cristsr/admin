import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-header',
  template: `
    <app-container>
      <div class="page-heading">
        <h2>Dashboard</h2>
      </div>
      <ul class="tabset page-tabs">
        <li class="tab">
          <a href="#" (click)="$event.preventDefault()" class="tab-link">
            <span>title</span>
          </a>
        </li>
        <li class="tab">
          <a href="#" (click)="$event.preventDefault()" class="tab-link">
            <span>title</span>
          </a>
        </li>
        <li class="tab">
          <a href="#" (click)="$event.preventDefault()" class="tab-link">
            <span>title</span>
          </a>
        </li>
      </ul>
    </app-container>
  `,
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
