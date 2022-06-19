import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-content',
  standalone: true,
  host: {
    class:
      'bg-[#EDEDF5] dark:bg-gray-500 p-4 flex flex-col h-full overflow-y-auto',
  },
  template: `<ng-content></ng-content>`,
})
export class ContentComponent {
  @Input() gap: string = '4';

  @HostBinding('class')
  get hostClasses() {
    return ['gap-'.concat(this.gap)];
  }
}
