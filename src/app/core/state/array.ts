import { BehaviorSubject, Observable, tap } from 'rxjs';

type ArrayStateOperator<T> = (source: Observable<T>) => Observable<T>;

/**
 * It takes an array of items and a target BehaviorSubject,and returns
 * an ArrayStateOperator that will update the target BehaviorSubject with
 * the items
 * @param target - BehaviorSubject<T[]> - this is the target BehaviorSubject that we want to update.
 * @returns A function that takes an observable and returns an observable.
 */
export function setArrayItems<T extends { id: any }>(
  target: BehaviorSubject<T[]>,
): ArrayStateOperator<T[]> {
  return (source: Observable<T[]>) =>
    source.pipe(
      tap((items) => {
        target.next(items);
      }),
    );
}

/**
 * It takes a BehaviorSubject of an array and returns an ArrayStateOperator that inserts the emitted item into the array
 * @param target - BehaviorSubject<T[]>
 * @returns A function that takes an observable and returns an observable.
 */
export function insertArrayItem<T extends { id: any }>(
  target: BehaviorSubject<T[]>,
): ArrayStateOperator<T> {
  return (source: Observable<T>) =>
    source.pipe(
      tap((item) => {
        const items = target.getValue();
        target.next([...items, item]);
      }),
    );
}

export function updateArrayElementKey<T extends { id: any }>(
  target: BehaviorSubject<T[]>,
  key: keyof T,
): ArrayStateOperator<T> {
  return (source: Observable<T>) =>
    source.pipe(
      tap((item) => {
        // Partial update of the item
        const value = target.getValue().map((i) => {
          if (i.id === item.id) {
            return { ...i, [key]: item[key] };
          }
          return i;
        });

        // Set the new value
        target.next(value);
      }),
    );
}

/**
 * It takes a BehaviorSubject of an array of items, and returns
 * an operator that takes an Observable of an item, and replaces the item in the
 * array with the same id
 * @param target - The target BehaviorSubject that we want to update.
 * @returns A function that takes an observable and returns an observable.
 */
export function updateArrayItem<T extends { id: any }>(
  target: BehaviorSubject<T[]>,
): ArrayStateOperator<T> {
  return (source: Observable<T>) =>
    source.pipe(
      tap((item) => {
        // Do nothing if value is null
        if (!target.value) {
          return;
        }

        // Replace the item in the array
        const value = target.value.map((v) => (v.id === item.id ? item : v));

        // Set the new value
        target.next(value);
      }),
    );
}

/**
 * It takes a BehaviorSubject of an array of objects, and returns
 * an ArrayStateOperator that removes an item from the array based on the id of
 * the item
 * @param target - The target BehaviorSubject that we want to modify
 * @returns A function that takes an Observable and returns an Observable.
 */
export function removeArrayItem<T extends { id: any }>(
  target: BehaviorSubject<T[]>,
): ArrayStateOperator<any> {
  return (source: Observable<any>) =>
    source.pipe(
      tap((id) => {
        // Do nothing if value is null
        if (!target.value) {
          return;
        }
        // Filter out the item from the array
        const value = target.getValue().filter((v) => v.id !== id);

        // Set the new value
        target.next(value);
      }),
    );
}
