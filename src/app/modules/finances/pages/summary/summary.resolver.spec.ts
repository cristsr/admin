import { TestBed } from '@angular/core/testing';

import { SummaryResolver } from './summary.resolver';

describe('SummaryResolver', () => {
  let resolver: SummaryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SummaryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
