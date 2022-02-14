import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: ` <span
    class="material-icons-outlined icon"
    [style.color]="color"
    [style.fontSize]="size"
  >
    {{ icon }}
  </span>`,
  styleUrls: ['icon.component.scss'],
})
export class IconComponent {
  private colorValue: string;
  private sizeValue: string;

  @Input() icon: string;

  @Input()
  set color(v: string) {
    if (!v) {
      return;
    }
    this.colorValue = `var(--${v})`;
  }
  get color(): string {
    return this.colorValue;
  }

  @Input()
  set size(v: string) {
    if (!v) {
      return;
    }
    this.sizeValue = `${v} !important`;
  }
  get size(): string {
    return this.sizeValue;
  }
}
