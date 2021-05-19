import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movement-item',
  host: {
    class: 'row a-center'
  },
  template: `
    <app-icon [icon]="icon"></app-icon>
    <div class="column a-start labels">
      <span>{{ description }}</span>
      <span>{{ category }}</span>
    </div>
    <span class="currency">{{ quantity | currency:'USD':true:'1.0' }}</span>
  `,
  styleUrls: ['./movement-item.component.scss']
})
export class MovementItemComponent implements OnInit {
  @Input() icon: string;
  @Input() description: string;
  @Input() category: string;
  @Input() quantity: number;
  @Input() color: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
