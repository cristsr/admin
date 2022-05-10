import { Component, HostBinding, Input } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

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
  set active(val: BooleanInput) {
    this.activeValue = coerceBooleanProperty(val);
  }

  @HostBinding('class.content-active')
  activeValue: boolean;

  constructor() {}
}
