import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMovementComponent } from './add-movement.component';

describe('AddMovementComponent', () => {
  let component: AddMovementComponent;
  let fixture: ComponentFixture<AddMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMovementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
