import {
  AfterViewInit,
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
    <ul class="tabset">
      <li *ngFor="let tab of tabs"
          (click)="selectTab(tab)"
          [class.active]="tab.active"
          class="tab">
        <a href="#" (click)="$event.preventDefault()" class="tab-link">
          <app-icon *ngIf="tab.icon" [name]="tab.icon"></app-icon>
          <span *ngIf="tab.tabTitle">{{ tab.tabTitle }}</span>
        </a>
      </li>
    </ul>
    <div class="tab-wrap">
      <ng-content select="app-tab"></ng-content>
    </div>
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
