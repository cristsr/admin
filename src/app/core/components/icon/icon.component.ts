import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `<span class="material-icons-outlined">{{ name }}</span>`,
  styles: [`
    span {
      padding: .5rem;
    }
  `]
})
export class IconComponent implements OnInit {
  @Input() name: string;

  private outlineValue: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
