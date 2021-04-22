import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective implements OnInit {
  private theme = 'dark';

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.el.nativeElement.classList.add(this.theme);
  }
}
