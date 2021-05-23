import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  host: { class: 'row' },
  template: `
    <div class="column" [style.width]="progress">
      <span>{{progress}}</span>
    </div>
  `,
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  @Input()
  set progress(value: string | number) {
    this.progressValue = `${value}%`;
  }
  get progress(): string | number {
    return this.progressValue;
  }

  private progressValue: string;

  constructor() { }

  ngOnInit(): void {
  }

}
