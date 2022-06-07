import { BehaviorSubject, Observable, tap } from 'rxjs';

type ObjectStateOperator<T> = (source: Observable<T>) => Observable<T>;

/**
 * It takes a BehaviorSubject and returns an operator that takes an Observable and returns an Observable that will set the BehaviorSubject to
 * the value of the Observable
 * @param target - BehaviorSubject<T> - The target BehaviorSubject that will be updated with the new value.
 * @returns A function that takes an observable and returns an observable.
 */
export function setObject<T>(
  target: BehaviorSubject<T>,
): ObjectStateOperator<T> {
  return (source: Observable<T>) =>
    source.pipe(
      tap((item) => {
        target.next(item);
      }),
    );
}

/**
 * It takes a BehaviorSubject and returns an operator that takes an Observable and returns an Observable that updates the BehaviorSubject with
 * the latest value from the Observable
 * @param target - BehaviorSubject<T> - the target object to update
 * @returns A function that takes an observable and returns an observable.
 */
export function updateObject<T>(
  target: BehaviorSubject<T>,
): ObjectStateOperator<T> {
  return (source: Observable<T>) =>
    source.pipe(
      tap((item) => {
        if (!target.value) {
          return;
        }

        target.next({ ...target.getValue(), ...item });
      }),
    );
}

/**
 * It takes an object and a key, and returns an operator that takes an observable and returns an observable that updates the object with the
 * value of the key from the observable
 * @param target - BehaviorSubject<T> - the target object to update
 * @param key - keyof T - this is a TypeScript feature that allows us to specify that the key parameter must be a key of the type T.
 * @returns A function that takes an observable and returns an observable.
 */
export function updateObjectKey<T>(
  target: BehaviorSubject<T>,
  key: keyof T,
): ObjectStateOperator<T> {
  return (source: Observable<T>) =>
    source.pipe(
      tap((item) => {
        if (!target.value) {
          return;
        }

        target.next({ ...target.getValue(), [key]: item[key] });
      }),
    );
}

/**
 * It takes an object and a key, and returns a function that takes an observable and returns an observable that will update the object with the
 * value of the key from the observable
 * @param target - The target BehaviorSubject that we want to update.
 * @param key - keyof T - This is a TypeScript type guard that ensures that the key is a valid key of the object.
 * @returns A function that takes an observable and returns an observable.
 */
export function insertObjectKey<T>(
  target: BehaviorSubject<T>,
  key: keyof T,
): ObjectStateOperator<T> {
  return (source: Observable<T>) =>
    source.pipe(
      tap((item) => {
        if (!target.value) {
          return;
        }

        target.next({ ...target.getValue(), [key]: item[key] });
      }),
    );
}

/**
 * It takes a BehaviorSubject and a key, and returns an operator that removes the key from the BehaviorSubject
 * @param target - BehaviorSubject<T> - the target object to update
 * @param key - keyof T
 * @returns An ObjectStateOperator<T>
 */
export function removeObjectKey<T>(
  target: BehaviorSubject<T>,
  key: keyof T,
): ObjectStateOperator<T> {
  return (source: Observable<T>) =>
    source.pipe(
      tap(() => {
        if (!target.value) {
          return;
        }

        target.next({ ...target.getValue(), [key]: undefined });
      }),
    );
}
