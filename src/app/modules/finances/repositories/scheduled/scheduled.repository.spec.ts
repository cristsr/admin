import { TestBed } from '@angular/core/testing';

import { ScheduledRepository } from './scheduled.repository';

describe('BudgetService', () => {
  let service: ScheduledRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
