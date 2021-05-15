import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  template: `
    <input [type]="type" [placeholder]="placeholder" [disabled]="disabled">
  `,
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() inputmode = '';

  constructor() { }

  ngOnInit(): void {
  }

}
