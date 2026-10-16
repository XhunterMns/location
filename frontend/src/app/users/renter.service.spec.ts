import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { RenterService } from './renter.service';

describe('RenterService', () => {
  let service: RenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(RenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
