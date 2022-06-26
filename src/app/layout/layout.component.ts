import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { pluck } from 'rxjs';

@Component({
  selector: 'app-layout',
  template: `
    <app-empty-layout *ngIf="layout === 'empty'"></app-empty-layout>
    <app-default-layout *ngIf="layout === 'default'"></app-default-layout>
  `,
})
export class LayoutComponent implements OnInit {
  layout: 'default' | 'empty';

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.pipe(pluck('layout')).subscribe({
      next: (layout) => (this.layout = layout),
    });
  }
}
