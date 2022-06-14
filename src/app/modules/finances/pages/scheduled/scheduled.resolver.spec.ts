import { TestBed } from '@angular/core/testing';

import { ScheduledResolver } from './scheduled.resolver';

describe('ScheduledResolver', () => {
  let resolver: ScheduledResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ScheduledResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
