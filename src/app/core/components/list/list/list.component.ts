import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  template: '<ng-content></ng-content>',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
