import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'app-list-header',
  template: `
    <div
      class="flex justify-between items-center rounded-xl mb-2 px-1 {{ color }}"
    >
      <div class="flex items-center">
        <div class="rounded-full w-8 h-8 flex justify-center items-center">
          <mat-icon>{{ icon }}</mat-icon>
        </div>

        <div class="pl-3 flex flex-col">
          <div class="text-sm font-medium">{{ name }}</div>
        </div>
      </div>

      <div
        *ngIf="showBack"
        matRipple
        (click)="back.emit()"
        class="rounded-full w-8 h-8 flex justify-center items-center"
      >
        <mat-icon>chevron_left</mat-icon>
      </div>
    </div>
  `,
  styles: [],
})
export class ListHeaderComponent {
  @Input() color: string;
  @Input() icon: string;
  @Input() name: string;

  @Input()
  get showBack(): boolean {
    return this._showBack;
  }
  set showBack(value: BooleanInput) {
    this._showBack = coerceBooleanProperty(value);
  }
  private _showBack = false;

  @Output() back = new EventEmitter<void>();
}
