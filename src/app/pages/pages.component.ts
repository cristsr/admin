import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
    <app-nav></app-nav>
    <div class="grid">
      <app-side-menu></app-side-menu>
      <section>
        <router-outlet></router-outlet>
      </section>
    </div>
  `,
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
