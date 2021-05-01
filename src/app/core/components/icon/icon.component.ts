import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `<span class="material-icons-outlined">{{ name }}</span>`,
  styles: [`
    :host {
      display: flex;
      justify-items: center;
    }
  `]
})
export class IconComponent {
  @Input() name: string;
}
