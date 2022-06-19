import { Component, OnInit } from '@angular/core';
import { ScheduledService } from 'modules/finances/services';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.scss'],
})
export class ScheduledComponent implements OnInit {
  constructor(private scheduledService: ScheduledService) {}

  ngOnInit() {
    console.log('ScheduledComponent');
  }
}
