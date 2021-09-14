import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-nav',
  host: {
    class: 'flex h-14 bg-white-200 shadow-lg border-t-2 border-gray-100 justify-around'
  },
  template: `
    <button mat-icon-button aria-label="Example icon button with a vertical three dot icon">
      <mat-icon>more_vert</mat-icon>
    </button>
    <button mat-icon-button color="primary" aria-label="Example icon button with a home icon">
      <mat-icon>home</mat-icon>
    </button>
    <button mat-icon-button color="accent" aria-label="Example icon button with a menu icon">
      <mat-icon>menu</mat-icon>
    </button>
    <button mat-icon-button color="warn" aria-label="Example icon button with a heart icon">
      <mat-icon>favorite</mat-icon>
    </button>
    <button mat-icon-button disabled aria-label="Example icon button with a open in new tab icon">
      <mat-icon>open_in_new</mat-icon>
    </button>
  `,
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
