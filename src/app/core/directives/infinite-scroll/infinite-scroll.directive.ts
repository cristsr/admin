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

    if (!this.io) {
      return;
    }

    if (completed) {
      this.disconnect();
    }
  }

  @Input()
  set active(value: boolean) {
    const active = coerceBooleanProperty(value);

    if (!this.io) {
      return;
    }

    if (active) {
      this.observe();
    } else {
      this.unobserve();
    }
  }

  @Output() scrolled = new EventEmitter<IntersectionObserverEntry>();

  private io: IntersectionObserver;

  constructor(private ngZone: NgZone, private root: ElementRef) {}

  ngOnInit(): void {
    this.configure();
  }

  private configure(): void {
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

    this.io = new IntersectionObserver(callback, config);
  }

  private disconnect(): void {
    this.io.disconnect();
  }

  private observe(): void {
    this.io.observe(this.target);
  }

  private unobserve(): void {
    this.io.unobserve(this.target);
  }
}
