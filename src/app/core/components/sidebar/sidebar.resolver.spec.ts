import { TestBed } from '@angular/core/testing';

import { SidebarResolver } from './sidebar.resolver';

describe('SidebarResolver', () => {
  let resolver: SidebarResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SidebarResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
