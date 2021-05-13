import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movement-item',
  template: `
    <div appFlex row align="center">
      <app-icon [icon]="icon"></app-icon>
      <div appFlex column align="start" class="labels">
        <span>{{ description }}</span>
        <span>{{ category }}</span>
      </div>
      <span class="currency">{{ quantity | currency:'USD':true:'1.0' }}</span>
    </div>
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
