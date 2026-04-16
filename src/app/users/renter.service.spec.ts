import { TestBed } from '@angular/core/testing';

import { RenterService } from './renter.service';

describe('RenterService', () => {
  let service: RenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
