import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-movement',
  template: `
    <div appFlex column>
      <app-input placeholder="Descripcion"></app-input>
      <app-input placeholder="Monto" type="number" inputmode="nummeric"></app-input>
      <app-input></app-input>
      <app-input></app-input>
    </div>
  `,
  styleUrls: ['./add-movement.component.scss']
})
export class AddMovementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
