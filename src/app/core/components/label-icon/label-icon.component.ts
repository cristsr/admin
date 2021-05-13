import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label-icon',
  template: `
      <div class="row">
          <app-icon [icon]="icon"></app-icon>
          <span>{{label}}</span>
      </div>
  `,
  styleUrls: ['./label-icon.component.scss']
})
export class LabelIconComponent {
  @Input() icon;
  @Input() label;
}
