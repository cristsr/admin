import { Directive, HostListener, Input } from '@angular/core';
import { Panable } from './pan.types';
import { formatDirection, isHorizontal } from './pan.utils';

@Directive({
  selector: '[appPan]',
})
export class PanDirective {
  @Input() target: Panable;

  @HostListener('window:panstart', ['$event'])
  onPanStart(event: any): void {
    event.direction = formatDirection(event.direction);
    this.target.onPanStart(event);
  }

  @HostListener('window:panright', ['$event'])
  onPanRight(event: any): void {
    event.direction = formatDirection(event.direction);
    if (!isHorizontal(event.direction)) {
      return;
    }
    this.target.onPanRight(event);
  }

  @HostListener('window:panleft', ['$event'])
  onPanLeft(event: any): void {
    event.direction = formatDirection(event.direction);
    if (!isHorizontal(event.direction)) {
      return;
    }
    this.target.onPanLeft(event);
  }

  @HostListener('window:panend', ['$event'])
  onPanEnd(event: any): void {
    event.direction = formatDirection(event.direction);
    this.target.onPanEnd(event);
  }
}
