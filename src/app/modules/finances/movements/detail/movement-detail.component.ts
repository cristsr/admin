import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movement-detail',
  templateUrl: './movement-detail.component.html',
  styleUrls: ['./movement-detail.component.scss'],
})
export class MovementDetailComponent {
  data2: any;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
  ) {}
}
