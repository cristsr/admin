import { Component } from '@angular/core';
import { EventEmitter2 } from 'eventemitter2';
import { LayoutEvents } from 'layout/constants';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddMovementComponent } from 'modules/finances/pages/add-movement/add-movement.component';

@Component({
  selector: 'app-finances',
  template: `<router-outlet></router-outlet>`,
})
export class FinancesComponent {
  constructor(
    private eventEmitter: EventEmitter2,
    private bottomSheet: MatBottomSheet,
  ) {
    eventEmitter.on(LayoutEvents.BottomNavigation, () => {
      this.bottomSheet.open(AddMovementComponent);
    });
  }
}
