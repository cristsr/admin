import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import {
  BooleanInput,
  coerceBooleanProperty,
  coerceNumberProperty,
  NumberInput,
} from '@angular/cdk/coercion';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective implements OnInit {
  @Input() target: HTMLElement;

  @Input()
  get threshold(): number {
    return this._threshold;
  }
  set threshold(value: NumberInput) {
    this._threshold = coerceNumberProperty(value);
  }
  private _threshold = 1;

  @Input()
  set completed(val: BooleanInput) {
    const completed = coerceBooleanProperty(val);
    if (completed) {
      this.disconnect();
    }
  }

  @Input()
  set disabled(value: boolean) {
    const disabled = coerceBooleanProperty(value);
    if (disabled) {
      this.unobserve();
    } else {
      this.observe();
    }
  }

  @Output() scrolled = new EventEmitter<IntersectionObserverEntry>();

  private intersectionObserver: IntersectionObserver;

  constructor(private ngZone: NgZone, private root: ElementRef) {}

  ngOnInit(): void {
    console.log('Root: ', this.root);
    console.log('Target: ', this.target);

    this.configure();
    this.observe();
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
            this.scrolled.emit(entry);
          }
        });
      };

      this.intersectionObserver = new IntersectionObserver(callback, config);
    });
  }

  disconnect(): void {
    if (!this.intersectionObserver) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.intersectionObserver.disconnect();
    });
  }

  observe(): void {
    if (!this.intersectionObserver) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.intersectionObserver.observe(this.target);
    });
  }

  unobserve(): void {
    if (!this.intersectionObserver) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.intersectionObserver.unobserve(this.target);
    });
  }
}
