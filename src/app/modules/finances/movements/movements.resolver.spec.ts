import { TestBed } from '@angular/core/testing';

import { MovementsResolver } from './movements.resolver';

describe('MovementsResolver', () => {
  let resolver: MovementsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MovementsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
