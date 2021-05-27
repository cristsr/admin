import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movements-list',
  template: `
    <div class="column">
      <b>{{ date | date }}</b>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./movements-list.component.scss']
})
export class MovementsListComponent implements OnInit {
  @Input() date: string;

  constructor() { }

  ngOnInit(): void {
  }

}
