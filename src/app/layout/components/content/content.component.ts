import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-content',
  standalone: true,
  host: {
    class: 'p-4 flex flex-col h-full overflow-y-auto',
  },
  template: `<ng-content></ng-content>`,
})
export class ContentComponent {
  @Input() gap: string = '4';

  @HostBinding('class')
  get gapClass() {
    return 'gap-'.concat(this.gap);
  }
}
