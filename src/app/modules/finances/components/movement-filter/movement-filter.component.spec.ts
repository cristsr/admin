import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementFilterComponent } from './movement-filter.component';

describe('MovementRangeComponent', () => {
  let component: MovementFilterComponent;
  let fixture: ComponentFixture<MovementFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovementFilterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
