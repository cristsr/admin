import { Component, HostBinding, Input } from '@angular/core';
import { convertToBool } from 'core/utils/utils';

@Component({
  selector: 'app-tab',
  template: `
    <ng-container *ngIf="active">
      <ng-content></ng-content>
    </ng-container>
  `,
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
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

  constructor() {}
}
