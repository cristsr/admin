import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementRangeComponent } from './movement-range.component';

describe('MovementRangeComponent', () => {
  let component: MovementRangeComponent;
  let fixture: ComponentFixture<MovementRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
