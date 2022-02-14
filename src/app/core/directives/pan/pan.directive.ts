import {
  Directive,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  Output,
} from '@angular/core';
import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { WINDOW } from 'core/config';

@Directive({
  selector: '[appPan]',
})
export class PanDirective {
  private speedValue: number;

  private deltaX: number;
  private deltaY: number;

  @Input()
  set speed(speed: NumberInput) {
    this.speedValue = coerceNumberProperty(speed);
    console.log(this.speedValue);
  }

  @Output() move = new EventEmitter();
  @Output() panend = new EventEmitter();

  @Output() right = new EventEmitter();
  @Output() left = new EventEmitter();

  constructor(@Inject(WINDOW) private window: Window) {}

  @HostListener('window:panstart', ['$event'])
  onPanStart(event: any): void {
    this.deltaX = event.deltaX;
    this.deltaY = event.deltaY;

    this.move.emit({
      percentage: 0,
    });
  }

  @HostListener('window:panright', ['$event'])
  onPanRight(event: any): void {
    const reason = this.speedValue
      ? (event.deltaX / this.window.innerWidth) * this.speedValue
      : event.deltaX / this.window.innerWidth;

    const normalization = reason > 1 ? 1 : reason < -1 ? -1 : reason;

    const percentage = Math.floor(normalization * 100);

    this.right.emit({
      percentage,
      direction: event.additionalEvent,
    });
  }

  @HostListener('window:panleft', ['$event'])
  onPanLeft(event: any): void {
    const reason = this.speedValue
      ? (event.deltaX / this.window.innerWidth) * this.speedValue
      : event.deltaX / this.window.innerWidth;

    const normalization = reason > 1 ? 1 : reason < -1 ? -1 : reason;

    const percentage = Math.floor(normalization * 100);

    this.left.emit({
      percentage,
      direction: event.additionalEvent,
    });
  }

  @HostListener('window:panend', ['$event'])
  onPanEnd(event: any): void {
    this.panend.emit({
      velocityX: event.velocityX,
      velocityY: event.velocityY,
      direction: event.additionalEvent,
    });
  }
}
