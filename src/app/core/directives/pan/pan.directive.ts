import { Directive, HostListener, Input } from '@angular/core';
import { Panable } from './pan.types';
import { isHorizontal } from './pan.utils';

@Directive({
  selector: '[appPan]',
})
export class PanDirective {
  @Input() target: Panable;

  @HostListener('window:panstart', ['$event'])
  onPanStart(event: any): void {
    this.target.onPanStart(event);
  }

  @HostListener('window:panright', ['$event'])
  onPanRight(event: any): void {
    if (!isHorizontal(event.direction)) {
      return;
    }
    this.target.onPanRight(event);
  }

  @HostListener('window:panleft', ['$event'])
  onPanLeft(event: any): void {
    if (!isHorizontal(event.direction)) {
      return;
    }
    this.target.onPanLeft(event);
  }

  @HostListener('window:panend', ['$event'])
  onPanEnd(event: any): void {
    this.target.onPanEnd(event);
  }
}
