import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ListSelectComponent } from 'core/components/form-list/list-select.component';
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field/form-field';
import { ListOption } from 'core/components/form-list/types';

@Component({
  selector: 'app-form-list',
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
        <input class="pointer-events-none" matInput readonly [value]="value?.label ?? ''" [placeholder]="placeholder">
      </div>
    </mat-form-field>
  `,
})
export class FormListComponent implements OnInit, OnChanges {
  @Input() appearance: MatFormFieldAppearance = 'fill';

  @Input() floatLabel: FloatLabelType = 'auto';

  @Input() hintLabel: string;

  @Input() label: string;

  @Input() value: ListOption;

  @Input() placeholder: string;

  @Input() icon: string;

  @Input() color: string;

  @Input() list: ListOption[];

  @Output() valueChange = new EventEmitter<ListOption>();

  private dialogRef: any;

  constructor(private readonly dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  openListDialog(): void {
    this.dialogRef = this.dialog.open(ListSelectComponent, {
      data: {
        list: this.list,
        value: this.value,
      },
      width: '80%'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.value = result;
        this.valueChange.emit(this.value);
      }
    });
  }


}
