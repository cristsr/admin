import { TestBed } from '@angular/core/testing';

import { MovementRepository } from './movement.repository';

describe('MovementService', () => {
  let service: MovementRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovementRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
