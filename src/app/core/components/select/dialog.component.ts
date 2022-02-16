import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogConfig, DialogResult, Option, Suboption, Type } from './types';

@Component({
  selector: 'app-dialog',
  template: `
    <div class="flex flex-col">
      <span class="text-xl font-medium pb-4">Categorías</span>

      <!-- Search -->
      <mat-form-field
        *ngIf="enableSearch"
        class="w-full"
        appearance="fill"
        floatLabel="auto"
      >
        <mat-label>Buscar</mat-label>
        <mat-icon matPrefix class="text-purple-600 mr-2">search</mat-icon>
        <input matInput [formControl]="searchControl" autocomplete="off" />
        <button
          *ngIf="isSearching"
          matSuffix
          mat-icon-button
          aria-label="Clear"
          (click)="searchControl.reset()"
        >
          <mat-icon>close</mat-icon>
        </button>
      </mat-form-field>

      <!-- List header for suboption -->
      <app-list-header
        *ngIf="showSuboptions"
        showBack
        [name]="optionSelected.name"
        [icon]="optionSelected.icon"
        [color]="optionSelected.color"
        (back)="closeSuboptions()"
      >
      </app-list-header>

      <div class="h-[240px] overflow-y-auto" #scrollable>
        <!-- search in suboptions -->
        <div *ngIf="searchSuboptions" class="flex flex-col gap-2">
          <ng-container *ngFor="let option of options; trackBy: trackByFn">
            <app-list-header
              [name]="option.name"
              [icon]="option.icon"
              [color]="option.color"
            >
            </app-list-header>

            <app-list-option
              *ngFor="let suboption of option.suboptions!; trackBy: trackByFn"
              [id]="suboption.id"
              [color]="option.color"
              [icon]="option.icon"
              [label]="suboption.name"
              [selected]="suboption.id === value?.suboption?.id"
              (click)="selectSuboption(suboption, option)"
            >
            </app-list-option>
          </ng-container>

          <span *ngIf="!options?.length" class="text font-medium text-center">
            No se encontraron resultados
          </span>
        </div>

        <!-- Options -->
        <div *ngIf="showOptions" class="flex flex-col gap-2">
          <app-list-option
            *ngFor="let option of options; trackBy: trackByFn"
            [id]="option.id"
            [color]="option.color"
            [icon]="option.icon"
            [label]="option.name"
            [selected]="option.id === value?.id"
            (click)="selectOption(option)"
          >
          </app-list-option>

          <span *ngIf="!options?.length" class="text font-medium text-center">
            No se encontraron resultados
          </span>
        </div>

        <!-- Suboptions -->
        <div *ngIf="showSuboptions" class="flex flex-col gap-2">
          <app-list-option
            *ngFor="let suboption of suboptions!; trackBy: trackByFn"
            [id]="suboption.id"
            [color]="optionSelected.color"
            [icon]="optionSelected.icon"
            [label]="suboption.name"
            [selected]="suboption.id === value?.suboption.id"
            (click)="selectSuboption(suboption)"
          >
          </app-list-option>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          mat-stroked-button
          class="h-10"
          color="primary"
          (click)="onAccept()"
        >
          <mat-icon class="mr-1">done</mat-icon>
          <span>Aceptar</span>
        </button>
      </div>
    </div>
  `,
})
export class DialogComponent implements OnInit {
  options: Option[];
  suboptions: Suboption[] | null;
  type: Type;
  value: DialogResult;
  enableSearch: boolean;
  isSearching = false;
  optionSelected: Option | null;
  searchControl = new FormControl('');
  private _showSuboptions = false;
  private _prevScroll = 0;

  @ViewChild('scrollable', { static: true }) scrollable: ElementRef;

  get searchSuboptions(): boolean {
    // if type is default return false always
    if (this.type === 'default') {
      return false;
    }

    // if type is nested return true if the option selected has suboptions
    return !this._showSuboptions && this.isSearching;
  }

  // Show or hide the list of Options
  get showOptions(): boolean {
    // If type is default we show the list of options always
    // This template is used for search by default
    if (this.type === 'default') {
      return true;
    }

    // If type is nested  it is necessary to determinate whether to show the options or the suboptions.
    return !this._showSuboptions && !this.isSearching;
  }

  // Show or hide the list of Suboptions
  get showSuboptions(): boolean {
    // If the type is default, suboptions are always hidden
    if (this.type === 'default') {
      return false;
    }

    // Show suboptions when option is selected and not searching
    return this._showSuboptions && !!this.optionSelected && !this.isSearching;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private config: DialogConfig,

    @Inject(DOCUMENT)
    private document: Document,

    private dialogRef: MatDialogRef<DialogComponent>,
  ) {}

  ngOnInit(): void {
    this.options = this.config.options;
    this.value = this.config.value;
    this.enableSearch = this.config.enableSearch;
    this.type = this.config.type;

    // Show suboptions
    if (this.type === 'nested' && this.value) {
      const option = this.options.find(({ id }) => id === this.value.id);
      this.selectOption(option);
    }

    this.searchControl.valueChanges.subscribe((value) => this.onSearch(value));

    this.scrollTo();
  }

  selectOption(value: Option): void {
    if (this.type === 'default') {
      this.value = value;
    } else {
      this.optionSelected = value;
      this.suboptions = value.suboptions;
      this._showSuboptions = true;
      this.scrollTo();
    }
  }

  selectSuboption(suboption: Suboption, option?: Option): void {
    if (option && !this.optionSelected) {
      this.optionSelected = option;
    }

    const { id, name, color, icon } = option || this.optionSelected;

    this.value = {
      id,
      name,
      color,
      icon,
      suboption,
    };

    console.log(this.value);
  }

  onSearch(value: string): void {
    this.isSearching = !!value;

    this.resetScroll();

    // Reset search
    if (!this.isSearching) {
      this.resetSearch();
      return;
    }

    if (this.type === 'default') {
      this.options = this.config.options.filter(({ name }) =>
        name.toLowerCase().includes(value.toLowerCase()),
      );
      return;
    }

    // nested type

    if (this._showSuboptions) {
      this._showSuboptions = false;
    }

    this.options = this.config.options
      .map((option) => ({
        ...option,
        suboptions: option.suboptions.filter(({ name }) =>
          name.toLowerCase().includes(value.toLowerCase()),
        ),
      }))
      .filter(({ suboptions }) => suboptions.length);
  }

  resetSearch(): void {
    this.options = this.config.options;
    this.scrollTo();
  }

  closeSuboptions(): void {
    this._showSuboptions = false;
    this.scrollTo();
  }

  onAccept(): void {
    this.dialogRef.close(this.value);
  }

  scrollTo(): void {
    const scroller = (target) =>
      setTimeout(() => {
        this.document.getElementById(target)?.scrollIntoView();
      });

    if (this.type === 'default') {
      if (!this.value) {
        return;
      }

      scroller(this.value.id);
      return;
    }

    // nested type

    // No value set to scroll
    if (!this.value) {
      // If show suboptions is true, scroll to the first suboption
      if (this._showSuboptions) {
        console.log('no value and show suboptions');
        this.snapshotScroll();
        this.resetScroll();
        return;
      }

      // If show suboptions is false, restore previous scroll
      if (!this.optionSelected) {
        console.log('no value and option selected');
        this.restoreScroll();
        return;
      }

      scroller(this.optionSelected.id);
      return;
    }

    // Value is set

    // If show suboptions is true, scroll to selected suboption
    if (this._showSuboptions) {
      const match = this.suboptions.find(
        ({ id }) => id === this.value.suboption.id,
      );

      if (match) {
        console.log('value and show suboptions and match');
        scroller(match.id);
        return;
      }

      this.resetScroll();
      console.log('value and show suboptions and no match');
      return;
    }

    // _showSuboptions is false

    // scoll to the value by default
    console.log('scroll to value');
    scroller(this.value.id);
  }

  resetScroll(): void {
    if (this.scrollable) {
      this.scrollable.nativeElement.scrollTop = 0;
    }
  }

  snapshotScroll(): void {
    if (this.scrollable) {
      this._prevScroll = this.scrollable.nativeElement.scrollTop;
    }
  }

  restoreScroll(): void {
    if (this.scrollable) {
      this.scrollable.nativeElement.scrollTop = this._prevScroll;
    }
  }

  trackByFn(index: number, item: Option): string | number {
    return item.id || index;
  }
}
