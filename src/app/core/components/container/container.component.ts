import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  template: '<ng-content></ng-content>',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  @Input()
  set rows(rows: string) {
    this.rowsValue = `repeat(${rows}, 1fr)`;
  }

  @HostBinding('style.grid-template-rows')
  rowsValue: string;

  @Input()
  set columns(columns: string) {
    this.columnsValue = `repeat(${columns}, 1fr)`;
  }

  @HostBinding('style.grid-template-columns')
  columnsValue: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
