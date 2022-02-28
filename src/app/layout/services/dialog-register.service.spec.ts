import { TestBed } from '@angular/core/testing';

import { DialogRegisterService } from './dialog-register.service';

describe('DialogRegisterService', () => {
  let service: DialogRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
