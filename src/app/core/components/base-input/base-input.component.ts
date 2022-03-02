import {
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnDestroy,
} from '@angular/core';
import {
  FormGroupDirective,
  NgControl,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormField } from '@angular/material/form-field';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { isNotNullOrUndefined } from 'core/utils';
import { ErrorState, onChangeFn, onTouchedFn } from './base-input.utils';

@Component({
  template: '',
  host: {
    '[id]': 'id',
    '[class.floating]': 'shouldLabelFloat',
    '[attr.data-placeholder]': 'placeholder',
    '[attr.aria-labelledby]': 'formField?.getLabelId()',
    '(focusin)': 'onFocusIn()',
    '(focusout)': 'onFocusOut()',
  },
})
export class BaseInputComponent
  extends ErrorState
  implements DoCheck, OnDestroy
{
  controlType: string;
  id: string;
  focused: boolean;
  onChange: (v) => void = onChangeFn;
  onTouched: () => void = onTouchedFn;

  @Input()
  get disabled(): boolean {
    if (isNotNullOrUndefined(this.ngControl?.disabled)) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    if (this.focused) {
      this.focused = false;
    }
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get required(): boolean {
    return (
      this._required ??
      this.ngControl?.control?.hasValidator(Validators.required) ??
      false
    );
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required: boolean;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get value(): any | null {
    return this._value;
  }
  set value(value: any | null) {
    this._value = value;
    this.stateChanges.next();
  }
  private _value: any | null;

  @Input('aria-describedby') userAriaDescribedBy: string;

  get empty(): boolean {
    return !this.value;
  }

  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty;
  }

  constructor(
    public defaultErrorStateMatcher: ErrorStateMatcher,
    public parentForm: NgForm,
    public parentFormGroup: FormGroupDirective,
    public ngControl: NgControl,
    public formField: MatFormField,
    public elementRef: ElementRef<HTMLElement>,
  ) {
    super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }

    this.formField.updateOutlineGap();
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  onFocusIn(): void {
    this.focused = true;
    this.stateChanges.next();
  }

  onFocusOut(): void {
    this.focused = false;
    this.onTouched();
    this.stateChanges.next();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  protected setId(id: number | string): void {
    if (this.controlType) {
      this.id = `${this.controlType}-${id}`;
    } else {
      this.id = String(id);
    }
  }

  protected setControlType(controlType: string): void {
    this.controlType = controlType;
  }

  setDescribedByIds(ids: string[]): void {
    if (!!ids.length) {
      this.elementRef.nativeElement.setAttribute(
        'aria-describedby',
        ids.join(' '),
      );
    }
  }
}
