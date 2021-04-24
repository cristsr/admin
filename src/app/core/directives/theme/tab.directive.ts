import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appTab]'
})
export class TabDirective {
  @Input() tabId: string;

  @Input() set tabActive(tabActive: string) {
    console.log(this.tabId);
    console.log(tabActive);
    this.tabActiveValue = tabActive;
  }

  private tabActiveValue: string;

  constructor(private elementRef: ElementRef) {
    console.log(elementRef);
  }

}
