import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { Submenu } from 'core/interfaces/menu';

@Component({
  selector: 'app-bottom-nav',
  host: {
    class: 'h-12 bg-white-200 shadow z-10',
  },
  template: `
    <div class="h-full flex justify-around items-center">
      <ng-container *ngFor="let item of config">
        <ng-container *ngIf="item.url">
          <div
            matRipple
            matRippleCentered
            class="flex flex-auto flex-basis-1 flex-col justify-center items-center rounded-[20%/50%] px-2 h-full"
          >
            <button [routerLink]="item.url">
              <mat-icon [routerLinkActive]="linkActiveClass">{{
                item.icon
              }}</mat-icon>
            </button>
            <div class="text-xs tracking-tight">{{ item.title }}</div>
          </div>
        </ng-container>

        <ng-container *ngIf="!item.url">
          <button mat-icon-button (click)="action.emit(item)">
            <mat-icon>{{ item.icon }}</mat-icon>
          </button>
        </ng-container>
      </ng-container>
    </div>
  `,
})
export class BottomNavComponent {
  @Input() config: Submenu[];

  @Input() linkActiveClass: string;

  @Output() action = new EventEmitter();

  constructor(private bottomSheet: MatBottomSheet) {}

  openBottomSheet(): void {
    this.bottomSheet.open(ExampleSheetComponent);
  }
}

@Component({
  selector: 'app-example-sheet',
  template: `
    <mat-nav-list>
      <a
        href="https://keep.google.com/"
        mat-list-item
        (click)="openLink($event)"
      >
        <span mat-line>Google Keep</span>
        <span mat-line>Add to a note</span>
      </a>

      <a
        href="https://docs.google.com/"
        mat-list-item
        (click)="openLink($event)"
      >
        <span mat-line>Google Docs</span>
        <span mat-line>Embed in a document</span>
      </a>

      <a
        href="https://plus.google.com/"
        mat-list-item
        (click)="openLink($event)"
      >
        <span mat-line>Google Plus</span>
        <span mat-line>Share with your friends</span>
      </a>

      <a
        href="https://hangouts.google.com/"
        mat-list-item
        (click)="openLink($event)"
      >
        <span mat-line>Google Hangouts</span>
        <span mat-line>Show to your coworkers</span>
      </a>
    </mat-nav-list>
  `,
})
export class ExampleSheetComponent {
  constructor(
    private bottomSheetRef: MatBottomSheetRef<ExampleSheetComponent>,
  ) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
