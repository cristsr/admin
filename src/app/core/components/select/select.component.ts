import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Optional,
  Output,
  Self,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NgControl,
  NgForm,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { DialogComponent } from './dialog.component';
import { Option, Type, DialogResult } from './types';
import { BaseInputComponent } from 'core/components/base-input/base-input.component';

@Component({
  selector: 'app-select',
  template: `
    <input
      class="bg-transparent"
      readonly
      [disabled]="disabled"
      [value]="value?.name"
    />
  `,
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: SelectComponent,
    },
  ],
})
export class SelectComponent
  extends BaseInputComponent
  implements OnChanges, ControlValueAccessor, MatFormFieldControl<Option>
{
  private static nextId = 0;
  private dialogRef: MatDialogRef<DialogComponent, DialogResult>;

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
  get options(): Option[] {
    return this._options;
  }
  set options(list: Option[]) {
    this._options = list;
    this.stateChanges.next();
  }
  private _options: Option[];

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

  override get shouldLabelFloat(): boolean {
    return !this.empty;
  }

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
    super(
      defaultErrorStateMatcher,
      parentForm,
      parentFormGroup,
      ngControl,
      formField,
      elementRef,
    );

    this.setControlType('category');
    this.setId(SelectComponent.nextId++);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.list) {
      if (this.dialogRef) {
        this.dialogRef.componentInstance.options = this.options;
      }
    }
  }

  openListDialog(): void {
    if (this.disabled) {
      return;
    }

    this.dialogRef = this.dialog.open(DialogComponent, {
      data: {
        options: this.options,
        value: this.value,
        enableSearch: this.enableSearch,
        type: this.type,
      },
      width: '80%',
      autoFocus: false,
    });

    this.dialogRef
      .afterClosed()
      .subscribe((result) => this.updateValue(result));
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
    this.stateChanges.next();
    this.valueChange.emit(this.value);
  }

  onContainerClick(event: MouseEvent): void {
    this.openListDialog();
  }
}
