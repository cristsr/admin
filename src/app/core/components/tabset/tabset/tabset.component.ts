import {
  Component,
  ContentChildren,
  Output,
  QueryList,
  EventEmitter,
  Input,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabset',
  template: `
    <div>
      <div class="flex justify-between">
        <ng-container *ngFor="let tab of tabs">
          <div
            (click)="selectTab(tab)"
            [class.active]="tab.active"
            class="tab-link"
          >
            <mat-icon *ngIf="tab.icon">{{ tab.icon }}</mat-icon>
            <span *ngIf="tab.tabTitle">{{ tab.tabTitle }}</span>
          </div>
        </ng-container>
      </div>
      <div>
        <ng-content select="app-tab"></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./tabset.component.scss'],
})
export class TabsetComponent {
  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;

  @Input() fullWidth: string;

  @Output() changeTab = new EventEmitter<any>();

  constructor() {}

  selectTab(selectedTab: TabComponent): void {
    if (selectedTab.active) {
      return;
    }

    this.tabs.forEach((tab) => (tab.active = tab === selectedTab));
    this.changeTab.emit(selectedTab);
  }
}
