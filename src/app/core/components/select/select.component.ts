import {
  Component, DoCheck,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges, OnDestroy,
  Optional,
  Output,
  Self,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_FORM_FIELD, MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { DialogComponent } from './dialog.component';
import { Option, DialogConfig, List, Sublist, Type } from './types';
import { BaseInputComponent } from 'core/components/base-input/base-input.component';


// tslint:disable-next-line:no-conflicting-lifecycle
@Component({
  selector: 'app-select',
  template: `
    <input
      class="bg-transparent"
      readonly
      [disabled]="disabled"
      [value]="value?.name">
  `,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: SelectComponent
    }
  ]
})
export class SelectComponent extends BaseInputComponent implements
  OnChanges, DoCheck, OnDestroy, ControlValueAccessor, MatFormFieldControl<Option> {
  private static nextId = 0;
  private dialogRef: MatDialogRef<DialogComponent, Option>;

  @Input()
  get type(): Type {
    return this._type;
  }
  set type(value: Type) {
    this._type = value;
    this.stateChanges.next();
  }
  private _type: Type = 'default';

  @Input()
  get list(): List {
    return this._list;
  }
  set list(list: List) {
    this._list = list;
    this.stateChanges.next();
  }
  private _list: List;

  @Input()
  get sublist(): Sublist {
    return this._sublist;
  }
  set sublist(sublist: Sublist) {
    this._sublist = sublist;
    this.stateChanges.next();
  }
  private _sublist: Sublist;

  @Input()
  get enableSearch(): boolean {
    return this._enableSearch;
  }
  set enableSearch(value: BooleanInput) {
    this._enableSearch = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _enableSearch = false;

  @Output() valueChange = new EventEmitter<Option>();

  constructor(
    public defaultErrorStateMatcher: ErrorStateMatcher,

    @Optional()
    public parentForm: NgForm,

    @Optional()
    public parentFormGroup: FormGroupDirective,

    @Optional()
    @Self()
    public ngControl: NgControl,

    @Optional()
    @Inject(MAT_FORM_FIELD)
    public formField: MatFormField,

    public elementRef: ElementRef<HTMLElement>,
    private dialog: MatDialog,
  ) {
    super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl, formField, elementRef);

    this.setControlType('category');
    this.setId(SelectComponent.nextId++);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.list) {
      if (this.dialogRef) {
        this.dialogRef.componentInstance.list = this.list;
      }
    }
  }

  openListDialog(): void {
    if (this.disabled) {
      return;
    }

    this.dialogRef = this.dialog.open<DialogComponent, DialogConfig, Option>(DialogComponent, {
      data: {
        list: this.list,
        sublist: this.sublist,
        value: this.value,
        enableSearch: this.enableSearch,
        type: this.type,
      },
      width: '80%',
      autoFocus: false,
    });

    this.dialogRef.afterClosed().subscribe(result => this.updateValue(result));
  }

  updateValue(value: Option): void {
    this.onTouched();
    this.stateChanges.next();

    if (!value) {
      return;
    }

    if (this.disabled) {
      return;
    }

    this.value = value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  onContainerClick(event: MouseEvent): void {
    this.openListDialog();
  }
}
