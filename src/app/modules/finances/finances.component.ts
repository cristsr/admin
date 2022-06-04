import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EventEmitter2 } from 'eventemitter2';
import { Events } from 'layout/constants';
import { Submenu } from 'layout/types';
import { MovementFormComponent } from 'modules/finances/components';

@Component({
  selector: 'app-finances',
  template: `<router-outlet></router-outlet>`,
})
export class FinancesComponent {
  constructor(
    private eventEmitter: EventEmitter2,
    private bottomSheet: MatBottomSheet,
  ) {
    this.listenLayoutEvent();
  }

  /**
   * It listens for the BOTTOM_NAV_ACTION event, and when it receives it,
   * it opens the MovementFormComponent in a bottom sheet
   */
  listenLayoutEvent(): void {
    this.eventEmitter.on(Events.BOTTOM_NAV_ACTION, (action: Submenu) => {
      if (action.tag !== 'add-movement') {
        return;
      }

      this.bottomSheet
        .open(MovementFormComponent)
        .afterDismissed()
        .subscribe({
          next: (result) => {
            if (result) {
              this.eventEmitter.emit(Events.BOTTOM_NAV_ACTION_DONE);
            }
          },
        });
    });
  }
}
