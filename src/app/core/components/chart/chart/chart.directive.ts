import { Directive, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';


@Directive({
  selector: '[appChart]'
})
export class ChartDirective implements OnInit {
  @Input() config: ChartConfiguration;
  @Output() create = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    const context = this.elementRef.nativeElement.getContext('2d');
    const chart = new Chart(context, this.config);
    this.create.emit(chart);
  }


}
