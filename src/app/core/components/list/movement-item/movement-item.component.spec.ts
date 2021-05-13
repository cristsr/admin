import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementItemComponent } from './movement-item.component';

describe('MovementItemComponent', () => {
  let component: MovementItemComponent;
  let fixture: ComponentFixture<MovementItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
