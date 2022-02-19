import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective implements OnInit {
  @Input() target: ElementRef;

  constructor(private root: ElementRef) {}

  ngOnInit(): void {
    console.log('Root: ', this.root);
    console.log('Target: ', this.target);
  }
}
