import { TestBed } from '@angular/core/testing';

import { BudgetsResolver } from './budgets.resolver';

describe('BudgetsResolver', () => {
  let resolver: BudgetsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BudgetsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
