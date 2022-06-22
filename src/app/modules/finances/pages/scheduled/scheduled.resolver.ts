import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { first, forkJoin, Observable } from 'rxjs';
import { ScheduledService } from 'modules/finances/services';
import { ScheduledPage } from 'modules/finances/types';

@Injectable({
  providedIn: 'root',
})
export class ScheduledResolver implements Resolve<ScheduledPage> {
  constructor(private scheduledService: ScheduledService) {}

  resolve(): Observable<ScheduledPage> {
    return forkJoin({
      scheduled: this.scheduledService.fetchScheduled(),
      average: this.scheduledService.average.pipe(first()),
    });
  }
}
