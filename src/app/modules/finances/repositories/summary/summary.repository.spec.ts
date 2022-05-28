import { TestBed } from '@angular/core/testing';

import { SummaryRepository } from './summary.repository';

describe('BudgetService', () => {
  let service: SummaryRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummaryRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
