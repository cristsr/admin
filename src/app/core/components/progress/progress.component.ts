import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  host: { class: 'flex bg-gray-100 rounded-full' },
  template: `
    <div
      matRipple
      class="flex flex-col rounded-full text-center"
      [class]="color"
      [style.width]="progress"
    >
      <b class="text-xs">{{ progress }}</b>
    </div>
  `,
})
export class ProgressComponent {
  private progressValue: string;

  @Input() color: string;

  @Input()
  set progress(value: string) {
    this.progressValue = `${value}%`;
  }

  get progress(): string {
    return this.progressValue;
  }

  constructor() {}
}
