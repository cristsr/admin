import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item',
  template: '<ng-content></ng-content>',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
