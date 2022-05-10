import { Observable, ReplaySubject } from 'rxjs';

export class State<T> {
  private _rawValue: T;
  private state = new ReplaySubject<T>(1);

  constructor(initialState?: T, private partialUpdate?: boolean) {
    if (initialState) {
      this.state.next(initialState);
      this._rawValue = initialState;
    }
  }

  get value(): Observable<T> {
    return this.state.asObservable();
  }

  get rawValue(): T {
    return this._rawValue;
  }

  next(next: T): void {
    if (this.partialUpdate) {
      const value = this.rawValue ? { ...this._rawValue, ...next } : next;
      this.state.next(value);
      this._rawValue = value;
    } else {
      this.state.next(next);
      this._rawValue = next;
    }
  }
}
