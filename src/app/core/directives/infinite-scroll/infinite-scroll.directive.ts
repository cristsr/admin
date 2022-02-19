import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective implements OnInit {
  @Input() target: HTMLElement;

  @Input() threshold = 1;

  @Input() disabled = false;

  @Input()
  get completed(): boolean {
    return this._completed;
  }
  set completed(val: BooleanInput) {
    this._completed = coerceBooleanProperty(val);
    if (this._completed) {
      this.stopObserving();
    }
  }
  private _completed = false;

  @Output() scrolled = new EventEmitter<IntersectionObserverEntry>();

  private intersectionObserver: IntersectionObserver;

  constructor(private ngZone: NgZone, private root: ElementRef) {}

  ngOnInit(): void {
    console.log('Root: ', this.root);
    console.log('Target: ', this.target);

    this.configure();
  }

  configure(): void {
    this.ngZone.runOutsideAngular(() => {
      const config = {
        root: this.root.nativeElement,
        threshold: this.threshold,
      };

      const callback = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            if (this.disabled) {
              return;
            }

            this.scrolled.emit(entry);
          }
        });
      };

      this.intersectionObserver = new IntersectionObserver(callback, config);

      this.intersectionObserver.observe(this.target);
    });
  }

  stopObserving(): void {
    this.ngZone.runOutsideAngular(() => {
      this.intersectionObserver.disconnect();
    });
  }
}
