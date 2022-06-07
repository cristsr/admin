import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { SummaryService } from 'modules/finances/services';
import { Summary } from 'modules/finances/types';

@Injectable({
  providedIn: 'root',
})
export class SummaryResolver implements Resolve<Summary> {
  constructor(private summaryService: SummaryService) {}

  resolve(): Observable<Summary> {
    return this.summaryService.fetchSummary();
  }
}
