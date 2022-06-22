import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledFormComponent } from './scheduled-form.component';

describe('BudgetFormComponent', () => {
  let component: ScheduledFormComponent;
  let fixture: ComponentFixture<ScheduledFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduledFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
