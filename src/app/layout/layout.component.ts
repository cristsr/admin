import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  template: `
    <app-empty-layout *ngIf="layout === 'empty'"></app-empty-layout>
    <app-default-layout *ngIf="layout === 'default'"></app-default-layout>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  layout: 'default' | 'empty';

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe({
      next: ({layout}) => this.layout = layout,
    });
  }

}
