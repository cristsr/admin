import { ErrorStateMatcher, mixinErrorState } from '@angular/material/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

export const ErrorState = mixinErrorState(
  class {
    constructor(
      public _defaultErrorStateMatcher: ErrorStateMatcher,
      public _parentForm: NgForm,
      public _parentFormGroup: FormGroupDirective,
      public ngControl: NgControl,
      public stateChanges: Subject<void>,
    ) {}
  },
);

export const onChangeFn = (_) => {};
export const onTouchedFn = () => {};
