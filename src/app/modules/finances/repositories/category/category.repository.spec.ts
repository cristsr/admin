import { TestBed } from '@angular/core/testing';

import { CategoryRepository } from './category.repository';

describe('CategoryService', () => {
  let service: CategoryRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
