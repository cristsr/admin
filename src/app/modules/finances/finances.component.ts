import { Component } from '@angular/core';
import { EventEmitter2 } from 'eventemitter2';
import { LayoutEvents } from 'layout/constants';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MovementFormComponent } from 'modules/finances/pages/movement-form/movement-form.component';

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

  listenLayoutEvent(): void {
    this.eventEmitter.on(LayoutEvents.BottomNavigation, (_e) => {
      // console.log(e);
      this.bottomSheet.open(MovementFormComponent);
    });
  }
}
