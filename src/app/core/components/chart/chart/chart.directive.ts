import { Directive, ElementRef, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import Chart from 'chart.js/auto';

@Directive({
  selector: '[appChart]'
})
export class ChartDirective implements OnInit {
  @Input() config: any;

  @Output() chartEv = new EventEmitter<any>();

  private chart: Chart;

  constructor(private elementRef: ElementRef) {
  }


  ngOnInit(): void {
    const context = this.elementRef.nativeElement.getContext('2d');
    this.chart = new Chart(context, this.config);
  }
}
