import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter, Subject, takeUntil } from 'rxjs';
import { EventEmitterService } from 'core/services';
import { Events } from 'layout/constants';
import { MovementFormComponent } from 'modules/finances/components';

@Component({
  selector: 'app-finances',
  template: `<router-outlet></router-outlet>`,
})
export class FinancesComponent implements OnInit, OnDestroy {
  #unsubscribeAll = new Subject<void>();

  constructor(
    private emitter: EventEmitterService,
    private bottomSheet: MatBottomSheet,
  ) {}

  ngOnInit(): void {
    this.emitter
      .on(Events.BOTTOM_NAV_ACTION)
      .pipe(
        takeUntil(this.#unsubscribeAll),
        filter((tag) => tag === 'add-movement'),
      )
      .subscribe({
        next: () => {
          this.bottomSheet.open(MovementFormComponent);
        },
      });
  }

  ngOnDestroy(): void {
    this.#unsubscribeAll.next();
    this.#unsubscribeAll.complete();
  }
}
