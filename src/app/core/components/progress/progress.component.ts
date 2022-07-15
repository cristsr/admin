import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress',
  host: { class: 'flex bg-default rounded-full' },
  template: `
    <div
      matRipple
      class="flex flex-col rounded-full text-center"
      [class]="color"
      [style.width]="progress"
    >
      <span class="text-xs text-white">{{ progress }}</span>
    </div>
  `,
})
export class ProgressComponent {
  private progressValue: string;

  @Input() color: string;

  @Input()
  set progress(value: any) {
    this.progressValue = `${value}%`;
  }

  get progress(): string {
    return this.progressValue;
  }

  constructor() {}
}
