import { Injectable } from '@angular/core';
import { filter, Observable, pluck, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventEmitterService {
  #emitter = new Subject<Emitter>();

  emit<T>(event: string, data?: T): void {
    this.#emitter.next({
      event,
      data: data ?? null,
    });
  }

  on<T>(event: string): Observable<T> {
    return this.#emitter.asObservable().pipe(
      filter((value: Emitter) => value.event === event),
      pluck('data'),
    );
  }
}

interface Emitter {
  event: string;
  data: any;
}
