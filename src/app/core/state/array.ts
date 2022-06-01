import { BehaviorSubject, Observable, tap } from 'rxjs';

type ArrayStateOperator<T> = (source: Observable<T>) => Observable<T>;

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

export function updateArrayItem<T extends { id: any }>(
  target: BehaviorSubject<T[]>,
): ArrayStateOperator<T> {
  return (source: Observable<T>) =>
    source.pipe(
      tap((item) => {
        // Replace the item in the array
        const value = target
          .getValue()
          .map((v) => (v.id === item.id ? item : v));

        // Set the new value
        target.next(value);
      }),
    );
}

export function removeArrayItem<T extends { id: any }>(
  target: BehaviorSubject<T[]>,
): ArrayStateOperator<number> {
  return (source: Observable<number>) =>
    source.pipe(
      tap((id) => {
        // Filter out the item from the array
        const value = target.getValue().filter((v) => v.id !== id);

        // Set the new value
        target.next(value);
      }),
    );
}
