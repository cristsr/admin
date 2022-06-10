import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor as NgHttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { EventEmitterService } from 'core/services';

@Injectable()
export class HttpInterceptor implements NgHttpInterceptor {
  constructor(private emitter: EventEmitterService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    this.emitter.emit('loader:show', true);

    return next.handle(request).pipe(
      finalize(() => {
        this.emitter.emit('loader:show', false);
      }),
    );
  }
}
