import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  host: {
    class:
      'flex flex-col rounded-xl shadow p-6 gap-4 bg-white dark:fg-dark dark:text-white',
  },
  template: '<ng-content></ng-content>',
})
export class CardComponent {}
