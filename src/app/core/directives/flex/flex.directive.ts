import { Directive, HostBinding, Input } from '@angular/core';


@Directive({
  selector: '[appFlex]'
})
export class FlexDirective {
  private rowValue = false;
  private columnValue = false;
  private justifyContent = 'flex-start';
  private alignItems = 'stretch';

  @Input()
  @HostBinding('class.row')
  set row(v: boolean) {
    this.columnValue = false;
    this.rowValue = typeof v === 'string' || !!v;
  }
  get row(): boolean {
    return this.rowValue;
  }

  @Input()
  @HostBinding('class.column')
  set column(v: boolean) {
    this.rowValue = false;
    this.columnValue = typeof v === 'string' || !!v;
  }
  get column(): boolean {
    return this.columnValue;
  }

  @Input()
  @HostBinding('style.justify-content')
  set justify(v: string) {
    this.justifyContent = FlexDirective.switchJustify(v);
  }
  get justify(): string {
    return this.justifyContent;
  }

  @Input()
  @HostBinding('style.align-items')
  set align(v: string) {
    this.alignItems = FlexDirective.switchAlign(v);
  }
  get align(): string {
    return this.alignItems;
  }

  constructor() { }

  private static switchJustify(v: string): string {
    switch (v) {
      case 'start': return 'flex-start';
      case 'end': return 'flex-end';
      case 'center': return 'center';
      case 'between': return 'space-between';
      case 'around': return 'space-around';
      case 'evenly': return 'space-evenly';
      default: return 'flex-start';
    }
  }

  private static switchAlign(v: string): string {
    switch (v) {
      case 'stretch': return 'stretch';
      case 'start': return 'flex-start';
      case 'end': return 'flex-end';
      case 'center': return 'center';
      case 'baseline': return 'baseline';
      default: return 'stretch';
    }
  }

}
