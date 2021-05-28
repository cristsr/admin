import {
  Component,
  ContentChildren,
  OnInit,
  Output,
  QueryList,
  EventEmitter, Input
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabset',
  template: `
    <app-card>
      <app-card-header appFlex row justify="between">
        <ng-container  *ngFor="let tab of tabs">
          <div
            (click)="selectTab(tab)"
            [class.active]="tab.active"
            class="tab-link">
            <app-icon *ngIf="tab.icon" [icon]="tab.icon"></app-icon>
            <span *ngIf="tab.tabTitle">{{ tab.tabTitle }}</span>
          </div>
        </ng-container>
      </app-card-header>
      <app-card-body>
        <ng-content select="app-tab"></ng-content>
      </app-card-body>
    </app-card>
  `,
  styleUrls: ['./tabset.component.scss']
})
export class TabsetComponent implements OnInit {
  @ContentChildren(TabComponent)
  tabs: QueryList<TabComponent>;

  @Input() fullWidth: string;

  @Output() changeTab = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
  }

  selectTab(selectedTab: TabComponent): void {
    if (selectedTab.active) {
      return;
    }

    this.tabs.forEach(tab => tab.active = tab === selectedTab);
    this.changeTab.emit(selectedTab);
  }
}
