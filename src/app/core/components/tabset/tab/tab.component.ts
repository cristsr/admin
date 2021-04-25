import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { convertToBool } from '../../../utils/utils';

@Component({
  selector: 'app-tab',
  template: `
    <ng-container *ngIf="active">
      <ng-content></ng-content>
    </ng-container>
  `,
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() tabTitle: string;

  @Input() icon: string;

  @Input()
  get active(): boolean {
    return this.activeValue;
  }
  set active(val: boolean) {
    this.activeValue = convertToBool(val);
  }

  @HostBinding('class.content-active')
  activeValue: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }
}

