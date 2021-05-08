import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-icon',
  template: `
    <div class="row">
      <app-icon [name]="icon"></app-icon>
      <span>{{name}}</span>
    </div>
  `,
  styleUrls: ['./label-icon.component.scss']
})
export class LabelIconComponent {
  @Input() icon;
  @Input() name;
}
