import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button appFlex row justify="center" align="center">
      <app-icon appFlex row *ngIf="icon" [icon]="icon"></app-icon>
      <div>
        <ng-content></ng-content>
      </div>
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  private roundedValue = false;

  @Input() icon: string;

  @Input()
  set rounded(v: any) {
    this.roundedValue = typeof v === 'string' || !!v;
  }

  get rounded(): any {
    return this.roundedValue;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
