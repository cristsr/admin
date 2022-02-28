import { Component } from '@angular/core';
import { EventEmitter2 } from 'eventemitter2';
import { LayoutEvents } from 'layout/constants';

@Component({
  selector: 'app-finances',
  template: `<router-outlet></router-outlet>`,
})
export class FinancesComponent {
  constructor(private eventEmitter: EventEmitter2) {
    eventEmitter.on(LayoutEvents.BottomNavigation, (e) => {
      console.log('BottomNavigation', e);
    });
  }
}
