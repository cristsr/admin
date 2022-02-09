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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'core/components/select/dialog.component';
import { MAT_FORM_FIELD, MatFormField } from '@angular/material/form-field';
import { Option, SelectConfig } from 'core/components/select/types';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, FormGroupDirective, NgControl, NgForm, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ErrorStateMatcher, mixinErrorState } from '@angular/material/core';
import { Subject } from 'rxjs';

const AppSelectBase = mixinErrorState(
  class {
    // tslint:disable:variable-name
    constructor(
      public _defaultErrorStateMatcher: ErrorStateMatcher,
      public _parentForm: NgForm,
      public _parentFormGroup: FormGroupDirective,
      public ngControl: NgControl,
    ) {}
    // tslint:enable:variable-name
  },
);

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
  host: {
    '[attr.aria-labelledby]': 'formField?.getLabelId()',
    '[class.floating]': 'shouldLabelFloat',
    '[attr.data-placeholder]': 'placeholder',
    '[id]': 'id',
    '(focusin)': 'onFocusIn()',
    '(focusout)': 'onFocusOut()',
  },
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: SelectComponent
    }
  ]
})
export class SelectComponent extends AppSelectBase implements
  OnChanges, DoCheck, OnDestroy, ControlValueAccessor, MatFormFieldControl<Option> {
  static nextId = 0;
// Control properties
  controlType = 'app-select';
  id = 'app-select-' + SelectComponent.nextId++;
  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  onChange: (value: Option) => void;
  onTouched: () => void;
  private dialogRef: MatDialogRef<DialogComponent, Option>;

  @Input()
  get placeholder(): string {
    return this.placeholderValue;
  }
  set placeholder(placeholder: string) {
    this.placeholderValue = placeholder;
    this.stateChanges.next();
  }
  private placeholderValue: string;

  @Input()
  get list(): Option[] {
    return this.listValue;
  }
  set list(list: Option[]) {
    this.listValue = list;
    this.stateChanges.next();
  }
  private listValue: Option[];

  @Input()
  get value(): Option | null {
    return this.currentValue;
  }
  set value(value: Option | null) {
    this.currentValue = value;
    this.stateChanges.next();
  }
  private currentValue: Option | null;

  @Input()
  get disabled(): boolean {
    if (this.ngControl?.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this.disabledValue;
  }
  set disabled(value: BooleanInput) {
    this.disabledValue = coerceBooleanProperty(value);
    if (this.focused) {
      this.focused = false;
    }
    this.stateChanges.next();
  }
  private disabledValue = false;

  @Input()
  set enableSearch(value: BooleanInput) {
    this.enableSearchValue = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private enableSearchValue = false;

  @Input()
  get required(): boolean {
    return this.requiredValue ?? this.ngControl?.control?.hasValidator(Validators.required) ?? false;
  }
  set required(value: BooleanInput) {
    this.requiredValue = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private requiredValue: boolean | undefined;

  @Input('aria-describedby') userAriaDescribedBy: string;

  @Output() valueChange = new EventEmitter<Option>();

  get empty(): boolean {
    return !this.value;
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  constructor(
    private readonly dialog: MatDialog,
    private elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() private parentForm: NgForm,
    @Optional() private parentFormGroup: FormGroupDirective,
    private defaultErrorStateMatcher: ErrorStateMatcher,
  ) {
    super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.formField.updateOutlineGap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
    if (changes.list) {
      if (this.dialogRef) {
        this.dialogRef.componentInstance.list = this.list;
      }
    }
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  openListDialog(): void {
    if (this.disabled) {
      return;
    }

    this.dialogRef = this.dialog.open<DialogComponent, SelectConfig, Option>(DialogComponent, {
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
    this.touched = true;
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

  onFocusIn(): void {
    this.focused = true;
    this.stateChanges.next();
  }

  onFocusOut(): void {
    this.focused = false;
    this.touched = true;
    this.onTouched();
    this.stateChanges.next();
  }

  /**
   * ControlValueAccessor functions
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: Option): void {
    this.value = value;
  }

  onContainerClick(event: MouseEvent): void {
    this.openListDialog();
  }

  setDescribedByIds(ids: string[]): void {
    const controlElement = this.elementRef.nativeElement.querySelector(
      `.${this.controlType}-container`
    );
    controlElement?.setAttribute('aria-describedby', ids.join(' '));
  }
}
