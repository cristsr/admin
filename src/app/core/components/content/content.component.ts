import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-content',
  standalone: true,
  host: {
    class:
      'flex flex-col gap-5 p-5 h-full overflow-y-auto bg-default text-default',
  },
  template: `<ng-content></ng-content>`,
})
export class ContentComponent {
  @Input() gap: string = '4';

  @HostBinding('class')
  get hostClasses() {
    return ['gap-' + this.gap];
  }
}
