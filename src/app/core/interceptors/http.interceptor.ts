import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor as NgHttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { EventEmitterService } from 'core/services';
import { DateTime } from 'luxon';

@Injectable()
export class HttpInterceptor implements NgHttpInterceptor {
  constructor(private emitter: EventEmitterService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    // Local date
    const date = DateTime.local();

    // Set headers
    const httpRequest = request.clone({
      setHeaders: {
        'x-time-zone': date.zoneName,
        'x-time-zone-offset': date.offset.toString(),
      },
    });

    // Show loader
    this.emitter.emit('loader:show', true);

    // Send request
    return next.handle(httpRequest).pipe(
      finalize(() => {
        // Hide loader
        this.emitter.emit('loader:show', false);
      }),
    );
  }
}
