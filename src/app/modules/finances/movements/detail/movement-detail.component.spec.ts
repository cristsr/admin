import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementDetailComponent } from './movement-detail.component';

describe('MovementDetailComponent', () => {
  let component: MovementDetailComponent;
  let fixture: ComponentFixture<MovementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovementDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
