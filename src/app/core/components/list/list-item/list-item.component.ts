import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: `
    <div appFlex row align="center">
      <app-icon name="favorite"></app-icon>
      <div appFlex column align="start" class="labels" >
        <span>Test</span>
        <span>Médico</span>
      </div>
      <span class="currency">{{120000 | currency}}</span>
    </div>
  `,
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
