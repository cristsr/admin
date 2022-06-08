import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { EventEmitterService } from 'core/services';
import { Events } from 'layout/constants';
import { Submenu } from 'layout/types';
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
        filter((action: Submenu) => action.tag === 'add-movement'),
        switchMap(() => this.openBottomSheet()),
      )
      .subscribe({
        next: (result) => {
          console.log('[FinancesComponent] afterDismissed result', result);
        },
      });
  }

  ngOnDestroy(): void {
    this.#unsubscribeAll.next();
    this.#unsubscribeAll.complete();
  }

  openBottomSheet(): Observable<any> {
    return this.bottomSheet.open(MovementFormComponent).afterDismissed();
  }
}
