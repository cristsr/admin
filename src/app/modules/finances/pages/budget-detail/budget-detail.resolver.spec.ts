import { TestBed } from '@angular/core/testing';

import { BudgetDetailResolver } from './budget-detail.resolver';

describe('BudgetDetailResolver', () => {
  let resolver: BudgetDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BudgetDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
