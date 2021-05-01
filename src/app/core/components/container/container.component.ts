import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      margin-right: auto;
      margin-left: auto;
      padding: 40px 4% 0;
      max-width: 1200px;
    }
  `]
})
export class ContainerComponent {}
