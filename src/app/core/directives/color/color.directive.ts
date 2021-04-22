import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective implements OnInit {
  @Input() appColor: string;

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    this.highlight(this.appColor);
  }

  private highlight(color: string): void {
    this.el.nativeElement.classList.add(color);
  }
}
