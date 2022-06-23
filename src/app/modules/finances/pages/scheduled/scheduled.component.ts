import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ScheduledService } from 'modules/finances/services';
import { Scheduled, ScheduledAverage } from 'modules/finances/types';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EventEmitterService } from 'core/services';
import { ScheduledFormComponent } from 'modules/finances/components';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.scss'],
})
export class ScheduledComponent implements OnInit, OnDestroy {
  average: ScheduledAverage;
  scheduled: Scheduled[];
  #unsubscribeAll = new Subject<void>();

  constructor(
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    private emitter: EventEmitterService,
    private scheduledService: ScheduledService,
  ) {}

  ngOnInit(): void {
    this.setupProperties();
    this.setupObservers();
  }

  ngOnDestroy(): void {
    this.#unsubscribeAll.next();
    this.#unsubscribeAll.complete();
  }

  setupProperties(): void {
    const { scheduled, average } = this.activatedRoute.snapshot.data.data;

    this.scheduled = scheduled;
    this.average = average;

    this.cd.detectChanges();
  }

  setupObservers(): void {
    this.scheduledService.scheduled
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe((data: Scheduled[]) => {
        this.scheduled = data;
        this.cd.detectChanges();
      });

    this.scheduledService.average
      .pipe(takeUntil(this.#unsubscribeAll))
      .subscribe({
        next: (data: ScheduledAverage) => {
          this.average = data;
          this.cd.detectChanges();
        },
      });
  }

  openScheduledForm(scheduled?: Scheduled): void {
    const data: any = {};

    if (scheduled) {
      data.scheduled = scheduled;
      data.action = 'read';
    }

    this.bottomSheet
      .open(ScheduledFormComponent, { data })
      .afterDismissed()
      .subscribe({
        next: () => {
          // Reload scheduled
          this.scheduledService.next();
        },
      });
  }
}
