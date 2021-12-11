import { TestBed } from '@angular/core/testing';

import { DefaultResolver } from './default.resolver';

describe('DefaultResolver', () => {
  let resolver: DefaultResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DefaultResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
