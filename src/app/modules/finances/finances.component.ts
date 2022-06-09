import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { filter, Subject, takeUntil } from 'rxjs';
import { EventEmitterService } from 'core/services';
import { Events } from 'layout/constants';
import { Submenu } from 'layout/types';
import { MovementFormComponent } from 'modules/finances/components';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-finances',
  template: `<router-outlet></router-outlet>`,
})
export class FinancesComponent implements OnInit, OnDestroy {
  #unsubscribeAll = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private emitter: EventEmitterService,
    private bottomSheet: MatBottomSheet,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe({
        next: (event) => {
          console.log('[FinancesComponent] router.events', event);
        },
      });

    this.activatedRoute.data.subscribe({
      next: (url) => {
        console.log('[FinancesComponent] url', url);
      },
    });

    this.emitter
      .on(Events.BOTTOM_NAV_ACTION)
      .pipe(
        takeUntil(this.#unsubscribeAll),
        filter((action: Submenu) => action.tag === 'add-movement'),
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
