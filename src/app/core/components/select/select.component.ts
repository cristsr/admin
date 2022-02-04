import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SelectDialogComponent } from 'core/components/select/select-dialog.component';
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field/form-field';
import { Option, SelectConfig } from 'core/components/select/types';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'app-select',
  template: `
    <mat-form-field
      class="w-full"
      [appearance]="appearance"
      [floatLabel]="floatLabel"
      [hintLabel]="hintLabel">

      <mat-label *ngIf="label" class="pointer-events-auto" (click)="openListDialog()">
        {{label}}
      </mat-label>

      <mat-icon *ngIf="icon" class="{{color}} pointer-events-auto mr-2" (click)="openListDialog()" matPrefix>
        {{icon}}
      </mat-icon>

      <div (click)="openListDialog()">
        <input class="pointer-events-none" matInput readonly [value]="value?.name ?? ''" [placeholder]="placeholder">
      </div>

    </mat-form-field>
  `,
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() appearance: MatFormFieldAppearance = 'fill';
  @Input() floatLabel: FloatLabelType = 'auto';
  @Input() hintLabel: string;
  @Input() label: string;
  @Input() value: Option;
  @Input() placeholder: string;
  @Input() icon: string;
  @Input() color: string;
  @Input() list: Option[];

  @Input()
  set enableSearch(value: BooleanInput) {
    this.enableSearchValue = coerceBooleanProperty(value);
  }

  @Output() valueChange = new EventEmitter<Option>();

  private enableSearchValue = false;
  private dialogRef: MatDialogRef<SelectDialogComponent, Option>;

  constructor(private readonly dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.list) {
      if (this.dialogRef) {
        this.dialogRef.componentInstance.list = this.list;
      }
    }
  }

  openListDialog(): void {
    this.dialogRef = this.dialog.open<SelectDialogComponent, SelectConfig, Option>(SelectDialogComponent, {
      data: {
        list: this.list,
        value: this.value,
        enableSearch: this.enableSearchValue,
      },
      width: '80%',
      autoFocus: false,
    });

    this.dialogRef.afterClosed().subscribe(result => this.updateValue(result));
  }

  updateValue(value: Option): void {
    if (!value) {
      return;
    }

    this.value = value;
    this.valueChange.emit(this.value);
  }


}
