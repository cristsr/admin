import { Directive, ElementRef, Input, OnInit} from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';


@Directive({
  selector: '[appChart]'
})
export class ChartDirective implements OnInit {
  @Input() config: ChartConfiguration;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    const context = this.elementRef.nativeElement.getContext('2d');
    const result = new Chart(context, this.config);
  }
}
