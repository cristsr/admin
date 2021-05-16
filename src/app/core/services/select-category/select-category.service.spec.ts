import { TestBed } from '@angular/core/testing';

import { SelectCategoryService } from './select-category.service';

describe('SelectCategoryService', () => {
  let service: SelectCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
