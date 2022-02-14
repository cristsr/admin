import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsListComponent } from './movements-list.component';

describe('MovementsListComponent', () => {
  let component: MovementsListComponent;
  let fixture: ComponentFixture<MovementsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovementsListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
